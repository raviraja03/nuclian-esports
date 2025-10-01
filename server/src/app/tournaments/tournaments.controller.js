import Tournament from "../../models/tournament.model.js";
import mongoose from "mongoose";
import {
  CustomError,
  GlobalErrorHandler,
} from "../../middleware/errorMiddleware.js";
import Registration from "../../models/registrationSchema.mode.js";

// USER ENDPOINTS
// GET /api/v1/tournaments - Fetch all visible tournaments with filtering and pagination

function parseQueryField(value, useRegex = true) {
  if (!value) return null;

  let parsed = value;

  // If comma separated
  if (typeof value === "string" && value.includes(",")) {
    parsed = value.split(",").map(v => v.trim());
  }

  if (Array.isArray(parsed)) {
    return { $in: parsed };
  } else if (useRegex) {
    return { $regex: new RegExp(parsed.trim(), "i") };
  } else {
    return parsed;
  }
}


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
                    { $eq: ["$tournament", "$$tournamentId"] },
                    { $eq: ["$status", "paid"] }, // only count paid users
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
      { $project: { registrations: 0 } }, // remove raw registrations array
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
      user: userId,
      tournament: id,
      status: "paid",
    }).lean();

    isRegistered = !!registration;
  }
  const registeredCount = await Registration.countDocuments({
    tournament: id,
    status: "paid",
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
  // ✅ Fetch user registrations (only paid ones)
  const registrations = await Registration.find({
    user: userId,
    status: "paid",
  })
    .populate({
      path: "tournament",
      match: { isVisible: true },
      select:
        "title game platform schedule status  entryFee prizePool roomId roomPassword totalMember",
    })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();
  // console.log(registrations);
  const tournaments = registrations
    .map((r) => {
      return { _id: r._id, tournament: r.tournament, team: r.team };
    })
    .filter(Boolean);
  const total = await Registration.countDocuments({
    user: userId,
    status: "paid",
  });

  res.status(200).json({
    success: true,
    count: tournaments.length,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    data: tournaments,
  });
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
