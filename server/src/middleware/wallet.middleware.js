const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

/**
 * Authenticate user with JWT token
 */
const isAuthenticated = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

/**
 * Check if user has admin role
 */
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin role required'
        });
    }
    next();
};

/**
 * Validate wallet access - users can only access their own wallet unless admin
 */
const validateWalletAccess = (req, res, next) => {
    const { userId } = req.params;
    
    // Admin can access any wallet
    if (req.user.role === 'admin') {
        return next();
    }
    
    // Users can only access their own wallet
    if (req.user.id !== userId) {
        return res.status(403).json({
            success: false,
            message: 'Access denied. You can only access your own wallet'
        });
    }
    
    next();
};

/**
 * Validate MongoDB ObjectId for transaction
 */
const validateTransactionId = (req, res, next) => {
    const { transactionId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid transaction ID format'
        });
    }
    
    next();
};

/**
 * Validate MongoDB ObjectId for wallet/user
 */
const validateWalletId = (req, res, next) => {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user ID format'
        });
    }
    
    next();
};

/**
 * Validate credit wallet request body
 */
const validateCreditRequest = (req, res, next) => {
    const { amount, coins, description } = req.body;
    
    if (!amount || !coins) {
        return res.status(400).json({
            success: false,
            message: 'Amount and coins are required'
        });
    }
    
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Amount must be a positive number'
        });
    }
    
    if (typeof coins !== 'number' || coins <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Coins must be a positive number'
        });
    }
    
    if (description && typeof description !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Description must be a string'
        });
    }
    
    next();
};

/**
 * Validate debit wallet request body
 */
const validateDebitRequest = (req, res, next) => {
    const { coins, description } = req.body;
    
    if (!coins) {
        return res.status(400).json({
            success: false,
            message: 'Coins amount is required'
        });
    }
    
    if (typeof coins !== 'number' || coins <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Coins must be a positive number'
        });
    }
    
    if (description && typeof description !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Description must be a string'
        });
    }
    
    next();
};

/**
 * Validate pagination parameters
 */
const validatePagination = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    if (page < 1) {
        return res.status(400).json({
            success: false,
            message: 'Page must be greater than 0'
        });
    }
    
    if (limit < 1 || limit > 100) {
        return res.status(400).json({
            success: false,
            message: 'Limit must be between 1 and 100'
        });
    }
    
    req.pagination = { page, limit };
    next();
};

module.exports = {
    isAuthenticated,
    isAdmin,
    validateWalletAccess,
    validateTransactionId,
    validateWalletId,
    validateCreditRequest,
    validateDebitRequest,
    validatePagination
};
