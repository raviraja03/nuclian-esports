const WalletService = require('./wallets.service');

/**
 * Create a wallet for authenticated user
 * @route POST /api/wallets
 */
exports.createWallet = async (req, res) => {
    try {
        const wallet = await WalletService.findOrCreateWallet(req.user.id);
        
        res.status(201).json({
            success: true,
            message: 'Wallet created/retrieved successfully',
            data: {
                userId: wallet.userId,
                coins: wallet.coins,
                isActive: wallet.isActive,
                createdAt: wallet.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating wallet',
            error: error.message
        });
    }
};

/**
 * Get wallet balance
 * @route GET /api/wallets/:userId/balance
 */
exports.getWalletBalance = async (req, res) => {
    try {
        const balance = await WalletService.getWalletBalance(req.params.userId);
        
        res.json({
            success: true,
            message: 'Wallet balance retrieved successfully',
            data: balance
        });
    } catch (error) {
        const status = error.message === 'Wallet not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Credit wallet with funds
 * @route POST /api/wallets/:userId/credit
 */
exports.creditWallet = async (req, res) => {
    try {
        const { amount, coins, description, metadata } = req.body;
        const result = await WalletService.creditWallet(
            req.params.userId,
            amount,
            coins,
            description,
            metadata
        );
        
        res.status(201).json({
            success: true,
            message: 'Wallet credited successfully',
            data: result
        });
    } catch (error) {
        let status = 500;
        if (error.message === 'Wallet not found or inactive') {
            status = 404;
        } else if (error.message.includes('validation')) {
            status = 400;
        }
        
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Debit wallet funds
 * @route POST /api/wallets/:userId/debit
 */
exports.debitWallet = async (req, res) => {
    try {
        const { coins, description, metadata } = req.body;
        const result = await WalletService.debitWallet(
            req.params.userId,
            coins,
            description,
            metadata
        );
        
        res.json({
            success: true,
            message: 'Wallet debited successfully',
            data: result
        });
    } catch (error) {
        let status = 500;
        if (error.message === 'Wallet not found or inactive') {
            status = 404;
        } else if (error.message.includes('Insufficient')) {
            status = 400;
        } else if (error.message.includes('validation')) {
            status = 400;
        }
        
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Get paginated transaction history
 * @route GET /api/wallets/:userId/transactions
 */
exports.getTransactionHistory = async (req, res) => {
    try {
        const { type } = req.query;
        const filters = type ? { type } : {};
        
        const result = await WalletService.getTransactions(
            req.params.userId,
            filters,
            req.pagination
        );
        
        res.json({
            success: true,
            message: 'Transaction history retrieved successfully',
            data: result
        });
    } catch (error) {
        const status = error.message === 'Wallet not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Get single transaction details
 * @route GET /api/wallets/:userId/transactions/:transactionId
 */
exports.getSingleTransaction = async (req, res) => {
    try {
        const transaction = await WalletService.getSingleTransaction(
            req.params.userId,
            req.params.transactionId
        );
        
        res.json({
            success: true,
            message: 'Transaction retrieved successfully',
            data: transaction
        });
    } catch (error) {
        let status = 500;
        if (error.message === 'Wallet not found' || error.message === 'Transaction not found') {
            status = 404;
        }
        
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};
