const express = require('express');
const {
    isAuthenticated,
    isAdmin,
    validateWalletId,
    validateTransactionId
} = require('../../middleware/wallet.middleware');

const {
    updateTransactionDescription,
    reverseTransaction,
    updateWalletStatus,
    completeTransaction,
    getAllWallets
} = require('./admin.controller');

const router = express.Router();

// Apply authentication and admin middleware to all routes
router.use(isAuthenticated, isAdmin);

/**
 * @route   GET /api/wallets
 * @desc    Get all wallets with pagination (admin utility)
 * @access  Admin
 */
router.get('/',
    getAllWallets
);

/**
 * @route   PATCH /api/wallets/transactions/:transactionId
 * @desc    Update transaction description
 * @access  Admin
 */
router.patch('/transactions/:transactionId',
    validateTransactionId,
    updateTransactionDescription
);

/**
 * @route   POST /api/wallets/transactions/:transactionId/reverse
 * @desc    Reverse a transaction
 * @access  Admin
 */
router.post('/transactions/:transactionId/reverse',
    validateTransactionId,
    reverseTransaction
);

/**
 * @route   PATCH /api/wallets/transactions/:transactionId/complete
 * @desc    Complete a pending transaction
 * @access  Admin
 */
router.patch('/transactions/:transactionId/complete',
    validateTransactionId,
    completeTransaction
);

/**
 * @route   PATCH /api/wallets/:userId/status
 * @desc    Update wallet status (lock/unlock)
 * @access  Admin
 */
router.patch('/:userId/status',
    validateWalletId,
    updateWalletStatus
);

module.exports = router;
