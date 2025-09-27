import { Router } from "express";
import {
  getAllTournaments,
  getLeaderboard,
  getMatchDetails,
  getMyTournaments,
  getPlayerOrTeamStats,
  getTournamentById,
  withdrawFromTournament,
} from "./tournaments.controller.js";
import {
  requireAuth,
  validateObjectId,
  asyncHandler,
  isParticipant,
} from "../../middleware/tournamentMiddleware.js";
import { protect, optionalAuth } from "../../middleware/auth.js";

const tournamentRouter = Router();

// GET /api/v1/tournaments
tournamentRouter.get("/", getAllTournaments);

// GET /api/v1/tournaments/:id
tournamentRouter.get("/:id", optionalAuth, getTournamentById);
// GET /api/v1/tournaments/my/all
tournamentRouter.get("/my/all", protect, getMyTournaments);

// DELETE /api/tournaments/:tournamentId/participants/:participantId
// This route is for user withdrawal only. Admin removal should be in admin.route.js if needed.
tournamentRouter.delete(
  "/:tournamentId/participants/:participantId",
  requireAuth,
  validateObjectId("tournamentId"),
  validateObjectId("participantId"),
  asyncHandler(withdrawFromTournament)
);

// GET /api/tournaments/:tournamentId/matches/:matchId
tournamentRouter.get(
  "/:tournamentId/matches/:matchId",
  validateObjectId("tournamentId"),
  validateObjectId("matchId"),
  asyncHandler(getMatchDetails)
);

// GET /api/tournaments/:tournamentId/leaderboard
tournamentRouter.get(
  "/:tournamentId/leaderboard",
  validateObjectId("tournamentId"),
  asyncHandler(getLeaderboard)
);

// GET /api/tournaments/:tournamentId/stats/:playerOrTeamId
tournamentRouter.get(
  "/:tournamentId/stats/:playerOrTeamId",
  validateObjectId("tournamentId"),
  validateObjectId("playerOrTeamId"),
  isParticipant,
  asyncHandler(getPlayerOrTeamStats)
);

export default tournamentRouter;
