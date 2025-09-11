const express = require('express');
const controller = require('./tournament.controller');
const {
  requireAuth,
  validateObjectId,
  asyncHandler,
  isParticipant
} = require('../../middleware/tournamentMiddleware');

const router = express.Router();

// GET /api/v1/tournaments
router.get(
  '/',
  asyncHandler(controller.getAllTournaments)
);

// GET /api/v1/tournaments/:id
router.get(
  '/:id',
  validateObjectId('id'),
  asyncHandler(controller.getTournamentById)
);

// POST /api/v1/tournaments/:id/register
router.post(
  '/:id/register',
  requireAuth,
  validateObjectId('id'),
  asyncHandler(controller.registerForTournament)
);

// POST /api/v1/tournaments/:id/check-in
router.post(
  '/:id/check-in',
  requireAuth,
  validateObjectId('id'),
  isParticipant,
  asyncHandler(controller.checkInToTournament)
);

// GET /api/v1/tournaments/my/all
router.get(
  '/my/all',
  requireAuth,
  asyncHandler(controller.getMyTournaments)
);

// DELETE /api/tournaments/:tournamentId/participants/:participantId
// This route is for user withdrawal only. Admin removal should be in admin.route.js if needed.
router.delete(
  '/:tournamentId/participants/:participantId',
  requireAuth,
  validateObjectId('tournamentId'),
  validateObjectId('participantId'),
  asyncHandler(controller.withdrawFromTournament)
);

// GET /api/tournaments/:tournamentId/matches/:matchId
router.get(
  '/:tournamentId/matches/:matchId',
  validateObjectId('tournamentId'),
  validateObjectId('matchId'),
  asyncHandler(controller.getMatchDetails)
);

// GET /api/tournaments/:tournamentId/leaderboard
router.get(
  '/:tournamentId/leaderboard',
  validateObjectId('tournamentId'),
  asyncHandler(controller.getLeaderboard)
);

// GET /api/tournaments/:tournamentId/stats/:playerOrTeamId
router.get(
  '/:tournamentId/stats/:playerOrTeamId',
  validateObjectId('tournamentId'),
  validateObjectId('playerOrTeamId'),
  isParticipant,
  asyncHandler(controller.getPlayerOrTeamStats)
);

module.exports = router;
