const express = require('express');
const adminController = require('./tournament.admin.controller');
const { checkAdmin } = require('../../middleware/checkAdmin');
const { isAdminParticipant } = require('../../middleware/tournamentMiddleware');

const router = express.Router();

// All routes are admin-only
router.use(checkAdmin);

router.get('/', adminController.getAllTournaments);
router.get('/:id', adminController.getTournamentById);
router.post('/', adminController.createTournament);
router.put('/:id', adminController.updateTournament);
router.delete('/:id', adminController.deleteTournament);
router.patch('/:id/status', adminController.updateTournamentStatus);
router.patch('/:id/participants/:userId/status', isAdminParticipant, adminController.updateParticipantStatus);

module.exports = router;
