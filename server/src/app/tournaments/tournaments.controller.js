import Tournament from "../../models/tournament.model.js";
import mongoose from "mongoose";
import {
  CustomError,
  GlobalErrorHandler,
} from "../../middleware/errorMiddleware.js";
import Registration from "../../models/registration.model.js";
import { parseQueryField } from "../../utilities/parseQuery.js";
import { generateOrderId } from "../../utilities/orderId.js";
import { cashfree } from "../../config/cashfree.js";
import Team from "../../models/team.model.js";
import Payment from "../../models/payment.model.js";

// USER ENDPOINTS
// GET /api/v1/tournaments - Fetch all visible tournaments with filtering and pagination

export const getAllTournaments = GlobalErrorHandler(async (req, res) => {
  let {
    page = 1,
    limit = 20,
    game,
    status,
    type,
    search,
    isVisible,
  } = req.query;

  let filter = {};
  page = Math.max(1, parseInt(page, 10));
  limit = Math.max(1, parseInt(limit, 10));

  // Apply filters
  if (isVisible) filter.isVisible = true;
  if (search) filter.title = { $regex: new RegExp(search.trim(), "i") };
  if (game) filter.game = parseQueryField(game);
  if (status) {
    filter.status = parseQueryField(status);
  }
  if (type) {
    filter.type = parseQueryField(type);
  }
  const skip = (page - 1) * limit;
  // Query tournaments and total count in parallel
  const [tournaments, total] = await Promise.all([
    Tournament.aggregate([
      { $match: filter },
      { $sort: { "schedule.matchStart": 1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "registrations", // 👈 your Registration collection name (check actual collection!)
          let: { tournamentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$tournamentID", "$$tournamentId"] },
                    { $eq: ["$status", "registered"] }, // only count paid users
                  ],
                },
              },
            },
            { $count: "count" },
          ],
          as: "registrations",
        },
      },
      {
        $addFields: {
          registeredCount: {
            $ifNull: [{ $arrayElemAt: ["$registrations.count", 0] }, 0],
          },
        },
      },
      {
        $project: {
          registrations: 0,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          type: 1,
          status: 1,
          entryFee: 1,
          prizePool: 1,
          registeredCount: 1,
          maxTeams: 1,
          thumbnail: 1,
          round: 1,
          eventCode: 1,
        },
      },
    ]),
    Tournament.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: tournaments,
    pagination: {
      total,
      page,
      limit,
      hasNextPage: skip + tournaments.length < total,
      hasPrevPage: page > 1,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// GET /api/v1/tournaments/:id - Get single tournament details

export const getTournamentById = GlobalErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req?.user?._id; // user comes from auth middleware

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new CustomError("Invalid tournament ID", 400));
  }

  const tournament = await Tournament.findOne({
    _id: id,
    isVisible: true,
  }).lean(); // lean = faster, returns plain JS object

  if (!tournament) {
    return next(new CustomError("Tournament not found with this ID", 404));
  }
  let isRegistered = false;

  if (userId) {
    const registration = await Registration.findOne({
      userID: userId,
      tournamentID: id,
      status: "registered",
    }).lean();

    isRegistered = !!registration;
  }
  const registeredCount = await Registration.countDocuments({
    tournamentID: id,
    status: "registered",
  });

  res.status(200).json({
    success: true,
    data: { ...tournament, isRegistered, registeredCount },
  });
});

// GET /api/v1/tournaments/my/all - Get tournaments the logged-in user is registered in
export const getMyTournaments = GlobalErrorHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { page = 1, limit = 6 } = req.query;
  const registrations = await Registration.find({
    userID: userId,
    status: "registered",
  })
    .populate({
      path: "tournamentID",
      match: { isVisible: true },
      select:
        "title game platform schedule status  entryFee prizePool roomId roomPassword teamSize round name eventCode",
    })
    .populate({ path: "teamID", select: "teamName members" })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();
  const tournaments = registrations
    .map((r) => {
      return { _id: r._id, tournament: r.tournamentID, team: r.teamID };
    })
    .filter(Boolean);

  const total = registrations.length;

  res.status(200).json({
    success: true,
    count: tournaments.length,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    data: tournaments,
  });
});

//for updating registration data like team name and members
export const updateRegistrationData = GlobalErrorHandler(
  async (req, res, next) => {
    const { registrationId, teamName, members } = req.body;
  const userId = req.user?._id; // assuming authentication middleware

  const registration = await Registration.findOne({ _id: registrationId })
    .populate("tournamentID", "title status teamSize eventCode")
    .populate("teamID", "name members");
        if (!registration) {
      return next(new CustomError("Registration not found", 404));
    }
      // Ownership check (only the player who registered can edit)

      if (registration.userID.toString() !== userId.toString()) {
    return next(new CustomError("Only the player who registered can edit this", 403));
  }
    const tournament = registration.tournamentID;

  // ❌ Block if tournament closed/cancelled/completed
  if (["registration-closed", "completed", "cancelled","in-progress"].includes(tournament.status)) {
    return next(new CustomError("Cannot edit team after registration is closed or tournament ended", 400));
  }

   if (members.length > tournament.teamSize) {
    return next(new CustomError(`Team size exceeds limit (${tournament.teamSize})`, 400));
  }

    registration.teamID.teamName = teamName ? teamName.trim() : null;
    registration.teamID.members = members.map((member,idx) => ({
      gameId: member.gameId,
      gameName: member.gameName,
      role: idx === 0 ? "leader" : "member",
    }));

    await registration.teamID.save();

    res.status(200).json({
      success: true,
      message: "Registration updated successfully",
    });
  }
);

// Register for a tournament (handles both free and paid)
export const handleRegistration = GlobalErrorHandler(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { tournamentId, teamName, players } = req.body;

    if (!tournamentId) throw new CustomError("Tournament ID is required", 400);
    const tournamentDoc = await Tournament.findById(tournamentId).session(
      session
    );
    if (!tournamentDoc) throw new CustomError("Tournament not found", 404);

    if (tournamentDoc.status !== "registration-open") {
      throw new CustomError("Registration is closed for this tournament", 400);
    }

    const registeredCount = await Registration.countDocuments({
      tournamentID: tournamentId,
      status: "registered",
    }).session(session);

    if (registeredCount >= tournamentDoc.maxTeams) {
      throw new CustomError("Tournament is full", 400);
    }

    const mode = tournamentDoc.type; // expected: solo, duo, squad
    if (mode !== "solo" && !teamName) {
      throw new CustomError(
        "Team name is required for duo/squad tournaments",
        400
      );
    }

    if (tournamentDoc.entryFee.amount === 0) {
      if (!players || players.length === 0) {
        throw new CustomError("Players list required for duo/squad", 400);
      }

      const [teamDoc] = await Team.create(
        [
          {
            tournamentID: tournamentId,
            mode,
            captainID: req.user._id,
            teamName: teamName ? teamName.trim() : null,
            members: players.map((player, idx) => ({
              gameId: player.gameId,
              gameName: player.gameName,
              role: idx === 0 ? "leader" : "member",
            })),
          },
        ],

        { session }
      );

      const [registrationDoc] = await Registration.create(
        [
          {
            tournamentID: tournamentId,
            participantType: mode,
            userID: req.user._id,
            teamID: teamDoc._id,
            status: "registered",
            paymentStatus: "free",
          },
        ],

        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return res.json({
        success: true,
        message: "Successfully registered for free tournament",
        registrationId: registrationDoc._id,
      });
    } else {
      // Paid Tournament
      const existingRegistration = await Payment.findOne({
        tournamentID: tournamentId,
        userID: req.user._id,
      })
        .session(session)
        .populate("registrationID");

      if (existingRegistration) {
        const cashfreeStatus = await cashfree.PGFetchOrder(
          existingRegistration.orderID
        );
        const orderStatus = cashfreeStatus.data?.order_status;

        if (existingRegistration.status === "paid" && orderStatus === "PAID") {
          throw next(
            new CustomError(
              "You are already registered for this tournament",
              400
            )
          );
        }
        if (
          ["EXPIRED", "FAILED", "ACTIVE", "CANCELLED"].includes(orderStatus)
        ) {
          if (existingRegistration.status === "pending") {
            //delete existing registration and team
            const teamId = existingRegistration.registrationID.teamID;
            if (teamId) {
              await Team.deleteOne({ _id: teamId }, { session });
            }
            await Registration.deleteOne(
              { _id: existingRegistration.registrationID._id },
              { session }
            );

            //delete existing payment
            await Payment.deleteOne(
              { _id: existingRegistration._id },
              { session }
            );
          }
        }
      }

      const orderId = generateOrderId();
      const orderData = {
        order_amount: parseInt(tournamentDoc.entryFee.amount),
        order_currency: "INR",
        order_id: orderId,
        customer_details: {
          customer_id: `USER_${req.user.id}`,
          customer_phone: req.user.phoneNumber,
          customer_name: req.user.name,
          customer_email: req.user.email,
        },
        order_meta: {
          return_url: `${process.env.CLIENT_URL}/payment-success?order_id=${orderId}`,
          payment_methods: "upi",
        },
        cart_details: {
          cart_items: [
            {
              item_id: tournamentDoc._id.toString(),
              item_name: tournamentDoc.title,
              item_original_unit_price: tournamentDoc.entryFee.amount,
              item_discounted_unit_price: tournamentDoc.entryFee.amount,
              item_quantity: 1,
              item_currency: "INR",
            },
          ],
        },
      };
      const tempDetails = {
        tournamentId,
        teamName: teamName ? teamName.trim() : null,
        mode,
        players,
      };
      const [team] = await Team.create(
        [
          {
            tournamentID: tournamentId,
            teamName: teamName ? teamName.trim() : null,
            mode,
            captainID: req.user._id,
            members: players.map((player, idx) => ({
              gameId: player.gameId,
              gameName: player.gameName,
              role: idx === 0 ? "leader" : "member",
            })),
          },
        ],

        { session }
      );

      const [registration] = await Registration.create(
        [
          {
            tournamentID: tournamentId,
            participantType: mode,
            userID: req.user._id,
            teamID: team._id,
            status: "waitlisted",
            paymentStatus: "pending",
          },
        ],

        { session }
      );

      const cashfreeResponse = await cashfree.PGCreateOrder(orderData);
      if (cashfreeResponse.data.payment_session_id) {
        const [payment] = await Payment.create(
          [
            {
              userID: req.user._id,
              tournamentID: tournamentId,
              registrationID: registration._id,
              amount: tournamentDoc.entryFee.amount,
              orderID: orderId,
              status: "pending",
              transactionID: cashfreeResponse.data.payment_session_id, // use session ID
              metadata: { cashfreeData: cashfreeResponse.data, tempDetails },
            },
          ],

          { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.json({
          success: true,
          message: "Order created, complete payment to confirm registration",
          orderId,
          paymentSessionId: cashfreeResponse.data.payment_session_id,
        });
      } else {
        throw next(new CustomError("Failed to create order", 500));
      }
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
});

// DELETE /api/tournaments/:tournamentId/participants/:participantId - Withdraw a user from a tournament
export const withdrawFromTournament = async (req, res) => {
  const { tournamentId, participantId } = req.params;
  const userId = req.user._id;
  if (
    !mongoose.Types.ObjectId.isValid(tournamentId) ||
    !mongoose.Types.ObjectId.isValid(participantId)
  ) {
    return res
      .status(400)
      .json({ message: "Invalid tournament or participant ID" });
  }
  const tournament = await Tournament.findOne({
    _id: tournamentId,
    isVisible: true,
  });
  if (!tournament) {
    return res.status(404).json({ message: "Tournament not found" });
  }
  const participant = tournament.participants.id(participantId);
  if (!participant) {
    return res.status(404).json({ message: "Participant not found" });
  }
  if (participant.userId.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Not your registration" });
  }
  if (tournament.schedule.startTime <= new Date()) {
    return res
      .status(400)
      .json({ message: "Cannot withdraw after tournament start" });
  }
  participant.remove();
  await tournament.save();
  res.status(200).json({ message: "Withdrawn from tournament" });
};

// GET /api/tournaments/:tournamentId/matches/:matchId - Get specific match details
export const getMatchDetails = async (req, res) => {
  // Placeholder: Implement match details logic as per your match schema
  res.status(501).json({ message: "Match details not implemented" });
};

// GET /api/tournaments/:tournamentId/leaderboard - Get tournament leaderboard
export const getLeaderboard = async (req, res) => {
  const { tournamentId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
    return res.status(400).json({ message: "Invalid tournament ID" });
  }
  const tournament = await Tournament.findOne({
    _id: tournamentId,
    isVisible: true,
  });
  if (!tournament) {
    return res.status(404).json({ message: "Tournament not found" });
  }
  // Example: Sort by position, then by status (winner > playing > eliminated)
  const leaderboard = [...tournament.participants].sort(
    (a, b) => (a.position || 999) - (b.position || 999)
  );
  res.status(200).json({ leaderboard });
};

// GET /api/tournaments/:tournamentId/stats/:playerOrTeamId - Get stats of a player/team in the tournament
export const getPlayerOrTeamStats = async (req, res) => {
  const { tournamentId, playerOrTeamId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
    return res.status(400).json({ message: "Invalid tournament ID" });
  }
  const tournament = await Tournament.findOne({
    _id: tournamentId,
    isVisible: true,
  });
  if (!tournament) {
    return res.status(404).json({ message: "Tournament not found" });
  }
  const participant = tournament.participants.find(
    (p) =>
      p.userId.toString() === playerOrTeamId ||
      (p.teamName && p.teamName === playerOrTeamId)
  );
  if (!participant) {
    return res.status(404).json({ message: "Participant not found" });
  }
  res.status(200).json({ stats: participant.metadata || {} });
};
