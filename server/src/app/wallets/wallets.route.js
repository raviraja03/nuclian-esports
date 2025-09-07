const express = require('express');
const {
    isAuthenticated,
    validateWalletAccess,
    validateWalletId,
    validateTransactionId,
    validateCreditRequest,
    validateDebitRequest,
    validatePagination
} = require('../../middleware/wallet.middleware');

const {
    createWallet,
    getWalletBalance,
    creditWallet,
    debitWallet,
    getTransactionHistory,
    getSingleTransaction
} = require('./wallets.controller');

const router = express.Router();

/**
 * @route   POST /api/wallets
 * @desc    Create a wallet for authenticated user
 * @access  Private (User)
 */
router.post('/',
    isAuthenticated,
    createWallet
);

/**
 * @route   GET /api/wallets/:userId/balance
 * @desc    Get wallet balance
 * @access  Private (Owner or Admin)
 */
router.get('/:userId/balance',
    isAuthenticated,
    validateWalletId,
    validateWalletAccess,
    getWalletBalance
);

/**
 * @route   POST /api/wallets/:userId/credit
 * @desc    Credit wallet with funds
 * @access  Private (Owner or Admin)
 */
router.post('/:userId/credit',
    isAuthenticated,
    validateWalletId,
    validateWalletAccess,
    validateCreditRequest,
    creditWallet
);

/**
 * @route   POST /api/wallets/:userId/debit
 * @desc    Debit wallet funds
 * @access  Private (Owner or Admin)
 */
router.post('/:userId/debit',
    isAuthenticated,
    validateWalletId,
    validateWalletAccess,
    validateDebitRequest,
    debitWallet
);

/**
 * @route   GET /api/wallets/:userId/transactions
 * @desc    Get paginated transaction history
 * @query   ?type=credit|debit&page=1&limit=10
 * @access  Private (Owner or Admin)
 */
router.get('/:userId/transactions',
    isAuthenticated,
    validateWalletId,
    validateWalletAccess,
    validatePagination,
    getTransactionHistory
);

/**
 * @route   GET /api/wallets/:userId/transactions/:transactionId
 * @desc    Get single transaction details
 * @access  Private (Owner or Admin)
 */
router.get('/:userId/transactions/:transactionId',
    isAuthenticated,
    validateWalletId,
    validateWalletAccess,
    validateTransactionId,
    getSingleTransaction
);

module.exports = router;
