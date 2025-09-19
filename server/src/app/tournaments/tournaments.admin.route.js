const express = require("express");
const adminController = require("./tournament.admin.controller");
const { authorize ,protect} = require("../../middleware/auth");
const { isAdminParticipant } = require("../../middleware/tournamentMiddleware");

const tournamentAdminRouter = express.Router();

// All routes are admin-only

tournamentAdminRouter.use(protect);
tournamentAdminRouter.use(authorize("admin"));

tournamentAdminRouter
  .get("/", adminController.getAllTournaments)
  .post("/", adminController.createTournament);
tournamentAdminRouter
  .get("/:id", adminController.getTournamentById)
  .patch("/:id", adminController.updateTournament)
  .delete("/:id", adminController.deleteTournament);

tournamentAdminRouter.patch(
  "/:id/status",
  adminController.updateTournamentStatus
);
tournamentAdminRouter.patch(
  "/:id/participants/:userId/status",
  isAdminParticipant,
  adminController.updateParticipantStatus
);

module.exports = tournamentAdminRouter;
