import mongoose from "mongoose";
import Tournament from "../../models/tournament.model.js";
import {
  CustomError,
  GlobalErrorHandler,
} from "../../middleware/errorMiddleware.js";

import { UploadToCloudnary,DeleteFromCloudnary } from "../../utilities/imageConfig.js";

// ================== GET ALL TOURNAMENTS ==================
export const getAllTournaments = GlobalErrorHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    status,
    game,
    type,
    region,
    platform,
    isVisible,
  } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (game) filter.game = game;
  if (type) filter.type = type;
  if (region) filter.region = region;
  if (platform) filter.platform = platform;
  if (isVisible !== undefined) filter.isVisible = isVisible === "true";

  const skip = (page - 1) * limit;
  const [tournaments, total] = await Promise.all([
    Tournament.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ "schedule.startTime": -1 }),
    Tournament.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: tournaments,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      hasNextPage: skip + tournaments.length < total,
      hasPrevPage: page > 1,
    },
  });
});

// ================== GET TOURNAMENT BY ID ==================
export const getTournamentById = GlobalErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid tournament ID", 400);
  }

  const tournament = await Tournament.findById(id);
  if (!tournament) {
    throw new CustomError("Tournament not found", 404);
  }

  res.status(200).json({ success: true, data: tournament });
});

// ================== CREATE TOURNAMENT ==================
export const createTournament = GlobalErrorHandler(async (req, res) => {
  if (!req.file) {
    throw new CustomError("Thumbnail image is required", 400);
  }
  const uploadResults = await UploadToCloudnary([req.file]);
  const image = uploadResults[0];

  const tournament = new Tournament({
    ...req.body,
    thumbnail: { url: image.secure_url, public_id: image.public_id },
  });
  try {
    await tournament.save();
    req.app.get("io").emit("tournamentCreated", { message: "refresh" });
  } catch (error) {
    await DeleteFromCloudnary([image.public_id])
    throw error;
  }

  res.status(201).json({
    success: true,
    message: "Tournament created successfully",
  });
});

// ================== UPDATE TOURNAMENT (PATCH) ==================
export const updateTournament = GlobalErrorHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid tournament ID", 400);
  }

  const tournament = await Tournament.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tournament) {
    throw new CustomError("Tournament not found", 404);
  }
  req.app
    .get("io")
    .emit("tournamentUpdated", { message: "refresh", tournamentId: id });

  res.status(200).json({
    success: true,
    message: "Tournament updated successfully",
  });
});

// ================== DELETE TOURNAMENT ==================
export const deleteTournament = GlobalErrorHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid tournament ID", 400);
  }

  const tournament = await Tournament.findByIdAndDelete(id);
  if (!tournament) {
    throw new CustomError("Tournament not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Tournament deleted successfully",
  });
});

// PATCH /tournaments/:id/status - Update tournament status
export const updateTournamentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid tournament ID" });
    }
    // Validate status
    const validStatuses = Tournament.schema.path("status").enumValues;
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const tournament = await Tournament.findById(id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    tournament.status = status;
    await tournament.save();
    res.status(200).json({ message: "Status updated", tournament });
  } catch (err) {
    next(err);
  }
};

// PATCH /tournaments/:id/participants/:userId/status - Update participant status (admin only)
export const updateParticipantStatus = async (req, res, next) => {
  try {
    const { id, userId } = req.params;
    const { status } = req.body;
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ message: "Invalid tournament or user ID" });
    }
    // Use isAdminParticipant middleware for ruggedness
    const tournament = req.tournament;
    const participant = req.participant;
    // Validate participant status
    const validStatuses = Tournament.schema.path(
      "participants.0.status"
    ).enumValues;
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid participant status" });
    }
    participant.status = status;
    await tournament.save();
    res
      .status(200)
      .json({ message: "Participant status updated", participant });
  } catch (err) {
    next(err);
  }
};
