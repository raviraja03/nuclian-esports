const Tournament = require('../../models/Tournament');
const mongoose = require('mongoose');

// USER ENDPOINTS
// GET /api/v1/tournaments - Fetch all visible tournaments with filtering and pagination
exports.getAllTournaments = async (req, res) => {
  const { page = 1, limit = 20, game, status } = req.query;
  const filter = { isVisible: true };
  if (game) filter.game = game;
  if (status) filter.status = status;
  const tournaments = await Tournament.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ 'schedule.startTime': -1 });
  const total = await Tournament.countDocuments(filter);
  res.status(200).json({ tournaments, total, page: Number(page), limit: Number(limit) });
};

// GET /api/v1/tournaments/:id - Get single tournament details
exports.getTournamentById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid tournament ID' });
  }
  const tournament = await Tournament.findOne({ _id: id, isVisible: true });
  if (!tournament) {
    return res.status(404).json({ message: 'Tournament not found' });
  }
  res.status(200).json(tournament);
};

// POST /api/v1/tournaments/:id/register - Register a user for a tournament
exports.registerForTournament = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid tournament ID' });
  }
  const tournament = await Tournament.findOne({ _id: id, isVisible: true });
  if (!tournament) {
    return res.status(404).json({ message: 'Tournament not found' });
  }
  if (tournament.status !== 'registration-open') {
    return res.status(400).json({ message: 'Registration is closed' });
  }
  if (tournament.participants.some(p => p.userId.toString() === userId.toString())) {
    return res.status(400).json({ message: 'Already registered' });
  }
  if (tournament.participants.length >= tournament.maxParticipants) {
    return res.status(400).json({ message: 'Tournament is full' });
  }
  tournament.participants.push({ userId });
  await tournament.save();
  res.status(201).json({ message: 'Registered successfully' });
};

// POST /api/v1/tournaments/:id/check-in - Check in a user for a tournament
exports.checkInToTournament = async (req, res) => {
  const tournament = req.tournament;
  const participant = req.participant;
  const now = new Date();
  if (now < tournament.schedule.checkInStart || now > tournament.schedule.checkInEnd) {
    return res.status(400).json({ message: 'Check-in window is closed' });
  }
  if (participant.status !== 'registered') {
    return res.status(400).json({ message: 'Already checked in or not eligible' });
  }
  participant.status = 'checked-in';
  await tournament.save();
  res.status(200).json({ message: 'Checked in successfully' });
};

// GET /api/v1/tournaments/my/all - Get tournaments the logged-in user is registered in
exports.getMyTournaments = async (req, res) => {
  const userId = req.user._id;
  const tournaments = await Tournament.find({
    isVisible: true,
    'participants.userId': userId
  });
  res.status(200).json({ tournaments });
};

// DELETE /api/tournaments/:tournamentId/participants/:participantId - Withdraw a user from a tournament
exports.withdrawFromTournament = async (req, res) => {
  const { tournamentId, participantId } = req.params;
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(tournamentId) || !mongoose.Types.ObjectId.isValid(participantId)) {
    return res.status(400).json({ message: 'Invalid tournament or participant ID' });
  }
  const tournament = await Tournament.findOne({ _id: tournamentId, isVisible: true });
  if (!tournament) {
    return res.status(404).json({ message: 'Tournament not found' });
  }
  const participant = tournament.participants.id(participantId);
  if (!participant) {
    return res.status(404).json({ message: 'Participant not found' });
  }
  if (participant.userId.toString() !== userId.toString()) {
    return res.status(403).json({ message: 'Not your registration' });
  }
  if (tournament.schedule.startTime <= new Date()) {
    return res.status(400).json({ message: 'Cannot withdraw after tournament start' });
  }
  participant.remove();
  await tournament.save();
  res.status(200).json({ message: 'Withdrawn from tournament' });
};

// GET /api/tournaments/:tournamentId/matches/:matchId - Get specific match details
exports.getMatchDetails = async (req, res) => {
  // Placeholder: Implement match details logic as per your match schema
  res.status(501).json({ message: 'Match details not implemented' });
};

// GET /api/tournaments/:tournamentId/leaderboard - Get tournament leaderboard
exports.getLeaderboard = async (req, res) => {
  const { tournamentId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
    return res.status(400).json({ message: 'Invalid tournament ID' });
  }
  const tournament = await Tournament.findOne({ _id: tournamentId, isVisible: true });
  if (!tournament) {
    return res.status(404).json({ message: 'Tournament not found' });
  }
  // Example: Sort by position, then by status (winner > playing > eliminated)
  const leaderboard = [...tournament.participants]
    .sort((a, b) => (a.position || 999) - (b.position || 999));
  res.status(200).json({ leaderboard });
};

// GET /api/tournaments/:tournamentId/stats/:playerOrTeamId - Get stats of a player/team in the tournament
exports.getPlayerOrTeamStats = async (req, res) => {
  const { tournamentId, playerOrTeamId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
    return res.status(400).json({ message: 'Invalid tournament ID' });
  }
  const tournament = await Tournament.findOne({ _id: tournamentId, isVisible: true });
  if (!tournament) {
    return res.status(404).json({ message: 'Tournament not found' });
  }
  const participant = tournament.participants.find(
    p => p.userId.toString() === playerOrTeamId || (p.teamName && p.teamName === playerOrTeamId)
  );
  if (!participant) {
    return res.status(404).json({ message: 'Participant not found' });
  }
  res.status(200).json({ stats: participant.metadata || {} });
};
