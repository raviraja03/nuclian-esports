const mongoose = require('mongoose');

// Middleware: requireAuth
exports.requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Middleware: validateObjectId(param)
exports.validateObjectId = (param) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
    return res.status(400).json({ message: `Invalid ObjectId for ${param}` });
  }
  next();
};

// Middleware: asyncHandler
exports.asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware: isParticipant (for user endpoints only)
exports.isParticipant = async (req, res, next) => {
  const Tournament = require('../models/Tournament');
  const tournamentId = req.params.id || req.params.tournamentId;
  const userId = req.user && req.user._id;
  if (!tournamentId || !userId) {
    return res.status(400).json({ message: 'Missing tournament or user' });
  }
  // Only check visible tournaments for user endpoints
  const tournament = await Tournament.findOne({ _id: tournamentId, isVisible: true });
  if (!tournament) {
    return res.status(404).json({ message: 'Tournament not found or not visible' });
  }
  const participant = tournament.participants.find(p => p.userId.toString() === userId.toString());
  if (!participant) {
    return res.status(403).json({ message: 'User is not a participant in this tournament' });
  }
  req.tournament = tournament;
  req.participant = participant;
  next();
};

// Admin middleware: isAdminParticipant (for admin endpoints)
exports.isAdminParticipant = async (req, res, next) => {
  const Tournament = require('../models/Tournament');
  const tournamentId = req.params.id || req.params.tournamentId;
  const userId = req.params.userId || req.params.participantId;
  if (!tournamentId || !userId) {
    return res.status(400).json({ message: 'Missing tournament or user' });
  }
  const tournament = await Tournament.findById(tournamentId);
  if (!tournament) {
    return res.status(404).json({ message: 'Tournament not found' });
  }
  const participant = tournament.participants.find(p => p.userId.toString() === userId.toString());
  if (!participant) {
    return res.status(404).json({ message: 'Participant not found' });
  }
  req.tournament = tournament;
  req.participant = participant;
  next();
};
