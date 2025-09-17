const express = require('express');
const adminController = require('./tournament.admin.controller');
const { checkAdmin } = require('../../middleware/checkAdmin');
const { isAdminParticipant } = require('../../middleware/tournamentMiddleware');

const tournamentAdminRouter = express.Router();

// All routes are admin-only
tournamentAdminRouter.use(checkAdmin);

tournamentAdminRouter.get('/', adminController.getAllTournaments);
tournamentAdminRouter.get('/:id', adminController.getTournamentById);
tournamentAdminRouter.post('/', adminController.createTournament);
tournamentAdminRouter.put('/:id', adminController.updateTournament);
tournamentAdminRouter.delete('/:id', adminController.deleteTournament);
tournamentAdminRouter.patch('/:id/status', adminController.updateTournamentStatus);
tournamentAdminRouter.patch('/:id/participants/:userId/status', isAdminParticipant, adminController.updateParticipantStatus);

module.exports = tournamentAdminRouter;
