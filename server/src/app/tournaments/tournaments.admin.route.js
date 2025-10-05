import { Router } from "express";
import {
  createTournament,
  deleteTournament,
  getAllTournaments,
  getTournamentById,
  updateParticipantStatus,
  updateTournament,
  updateTournamentStatus,
} from "./tournament.admin.controller.js";
import { authorize, protect } from "../../middleware/auth.js";
import { isAdminParticipant } from "../../middleware/tournamentMiddleware.js";
import {multerMiddleware} from "../../utilities/imageConfig.js"
const tournamentAdminRouter = Router();

// All routes are admin-only

tournamentAdminRouter.use(protect);
tournamentAdminRouter.use(authorize("admin","superadmin"));

tournamentAdminRouter.get("/", getAllTournaments).post("/", multerMiddleware,createTournament);
tournamentAdminRouter
  .get("/:id", getTournamentById)
  .patch("/:id", updateTournament)
  .delete("/:id", deleteTournament);

tournamentAdminRouter.patch("/:id/status", updateTournamentStatus);
tournamentAdminRouter.patch(
  "/:id/participants/:userId/status",
  isAdminParticipant,
  updateParticipantStatus
);

export default tournamentAdminRouter;
