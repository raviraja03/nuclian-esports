const mongoose = require('mongoose');
const Tournament = require('../../models/Tournament');

// GET /tournaments - Get all tournaments with pagination and filters
exports.getAllTournaments = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, game, type, region, platform } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (game) filter.game = game;
    if (type) filter.type = type;
    if (region) filter.region = region;
    if (platform) filter.platform = platform;
    const tournaments = await Tournament.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ 'schedule.startTime': -1 });
    const total = await Tournament.countDocuments(filter);
    res.status(200).json({ tournaments, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    next(err);
  }
};

// GET /tournaments/:id - Get single tournament by ID
exports.getTournamentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid tournament ID' });
    }
    const tournament = await Tournament.findById(id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.status(200).json(tournament);
  } catch (err) {
    next(err);
  }
};

// POST /tournaments - Create a tournament
exports.createTournament = async (req, res, next) => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();
    res.status(201).json({ message: 'Tournament created', tournament });
  } catch (err) {
    next(err);
  }
};

// PUT /tournaments/:id - Update tournament fields
exports.updateTournament = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid tournament ID' });
    }
    const tournament = await Tournament.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.status(200).json({ message: 'Tournament updated', tournament });
  } catch (err) {
    next(err);
  }
};

// DELETE /tournaments/:id - Delete a tournament
exports.deleteTournament = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid tournament ID' });
    }
    const tournament = await Tournament.findByIdAndDelete(id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.status(200).json({ message: 'Tournament deleted' });
  } catch (err) {
    next(err);
  }
};

// PATCH /tournaments/:id/status - Update tournament status
exports.updateTournamentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid tournament ID' });
    }
    // Validate status
    const validStatuses = Tournament.schema.path('status').enumValues;
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const tournament = await Tournament.findById(id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    tournament.status = status;
    await tournament.save();
    res.status(200).json({ message: 'Status updated', tournament });
  } catch (err) {
    next(err);
  }
};

// PATCH /tournaments/:id/participants/:userId/status - Update participant status (admin only)
exports.updateParticipantStatus = async (req, res, next) => {
  try {
    const { id, userId } = req.params;
    const { status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid tournament or user ID' });
    }
    // Use isAdminParticipant middleware for ruggedness
    const tournament = req.tournament;
    const participant = req.participant;
    // Validate participant status
    const validStatuses = Tournament.schema.path('participants.0.status').enumValues;
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid participant status' });
    }
    participant.status = status;
    await tournament.save();
    res.status(200).json({ message: 'Participant status updated', participant });
  } catch (err) {
    next(err);
  }
};
