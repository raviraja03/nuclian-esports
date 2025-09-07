const WalletService = require('./wallets.service');

/**
 * Update transaction description
 * @route PATCH /api/wallets/transactions/:transactionId
 */
exports.updateTransactionDescription = async (req, res) => {
    try {
        const { description } = req.body;
        
        if (!description || typeof description !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Valid description is required'
            });
        }
        
        const transaction = await WalletService.updateTransactionDescription(
            req.params.transactionId,
            description.trim()
        );
        
        res.json({
            success: true,
            message: 'Transaction description updated successfully',
            data: transaction
        });
    } catch (error) {
        const status = error.message === 'Transaction not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Reverse a transaction
 * @route POST /api/wallets/transactions/:transactionId/reverse
 */
exports.reverseTransaction = async (req, res) => {
    try {
        const result = await WalletService.reverseTransaction(
            req.params.transactionId,
            req.user.id
        );
        
        res.status(201).json({
            success: true,
            message: 'Transaction reversed successfully',
            data: result
        });
    } catch (error) {
        let status = 500;
        if (error.message === 'Transaction not found') {
            status = 404;
        } else if (error.message.includes('only reverse completed') || 
                   error.message.includes('Insufficient balance')) {
            status = 400;
        }
        
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Update wallet status (lock/unlock)
 * @route PATCH /api/wallets/:userId/status
 */
exports.updateWalletStatus = async (req, res) => {
    try {
        const { isActive } = req.body;
        
        if (typeof isActive !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'isActive must be a boolean value'
            });
        }
        
        const wallet = await WalletService.updateWalletStatus(
            req.params.userId,
            isActive
        );
        
        res.json({
            success: true,
            message: `Wallet ${isActive ? 'activated' : 'deactivated'} successfully`,
            data: wallet
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
 * Complete a pending transaction (admin utility)
 * @route PATCH /api/wallets/transactions/:transactionId/complete
 */
exports.completeTransaction = async (req, res) => {
    try {
        const { status = 'completed' } = req.body;
        
        if (!['completed', 'failed'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status must be either completed or failed'
            });
        }
        
        const result = await WalletService.completeTransaction(
            req.params.transactionId,
            status
        );
        
        res.json({
            success: true,
            message: `Transaction marked as ${status}`,
            data: result
        });
    } catch (error) {
        const status = error.message === 'Transaction not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Get all wallets with pagination (admin utility)
 * @route GET /api/wallets
 */
exports.getAllWallets = async (req, res) => {
    try {
        const Wallet = require('../../models/wallet.model.js');
        const { page = 1, limit = 10, isActive } = req.query;
        
        const filter = {};
        if (typeof isActive === 'string') {
            filter.isActive = isActive === 'true';
        }
        
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const wallets = await Wallet.find(filter)
            .populate('userId', 'name email')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });
            
        const total = await Wallet.countDocuments(filter);
        
        res.json({
            success: true,
            message: 'Wallets retrieved successfully',
            data: {
                wallets,
                pagination: {
                    current: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / parseInt(limit))
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving wallets',
            error: error.message
        });
    }
};
