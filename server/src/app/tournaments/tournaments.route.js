const express = require("express");
const controller = require("./tournaments.controller");
const {
  requireAuth,
  validateObjectId,
  asyncHandler,
  isParticipant,
} = require("../../middleware/tournamentMiddleware");
const { protect, optionalAuth } = require("../../middleware/auth");

const tournamentRouter = express.Router();

// GET /api/v1/tournaments
tournamentRouter.get("/", controller.getAllTournaments);

// GET /api/v1/tournaments/:id
tournamentRouter.get("/:id", optionalAuth, controller.getTournamentById);
// GET /api/v1/tournaments/my/all
tournamentRouter.get("/my/all", protect, controller.getMyTournaments);

// DELETE /api/tournaments/:tournamentId/participants/:participantId
// This route is for user withdrawal only. Admin removal should be in admin.route.js if needed.
tournamentRouter.delete(
  "/:tournamentId/participants/:participantId",
  requireAuth,
  validateObjectId("tournamentId"),
  validateObjectId("participantId"),
  asyncHandler(controller.withdrawFromTournament)
);

// GET /api/tournaments/:tournamentId/matches/:matchId
tournamentRouter.get(
  "/:tournamentId/matches/:matchId",
  validateObjectId("tournamentId"),
  validateObjectId("matchId"),
  asyncHandler(controller.getMatchDetails)
);

// GET /api/tournaments/:tournamentId/leaderboard
tournamentRouter.get(
  "/:tournamentId/leaderboard",
  validateObjectId("tournamentId"),
  asyncHandler(controller.getLeaderboard)
);

// GET /api/tournaments/:tournamentId/stats/:playerOrTeamId
tournamentRouter.get(
  "/:tournamentId/stats/:playerOrTeamId",
  validateObjectId("tournamentId"),
  validateObjectId("playerOrTeamId"),
  isParticipant,
  asyncHandler(controller.getPlayerOrTeamStats)
);

module.exports = tournamentRouter;
