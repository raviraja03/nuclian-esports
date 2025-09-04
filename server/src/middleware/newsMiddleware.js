const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

/**
 * Validates if the given parameter is a valid MongoDB ObjectId
 */
const validateObjectId = (param) => (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
        return res.status(400).json({
            success: false,
            message: `Invalid ${param} format`,
            data: null
        });
    }
    next();
};

/**
 * Verifies JWT token and adds user to request
 */
const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required',
                data: null
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            data: null
        });
    }
};

/**
 * Checks if user has admin role
 */
const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.roles?.includes('admin')) {
        return res.status(403).json({
            success: false,
            message: 'Admin access required',
            data: null
        });
    }
    next();
};

/**
 * Validates news creation/update payload
 */
const validateNewsPayload = (req, res, next) => {
    const { headline, summary, content } = req.body;

    if (!headline || !summary || !content) {
        return res.status(400).json({
            success: false,
            message: 'Headline, summary, and content are required',
            data: null
        });
    }

    if (headline.length < 10 || headline.length > 200) {
        return res.status(400).json({
            success: false,
            message: 'Headline must be between 10 and 200 characters',
            data: null
        });
    }

    if (summary.length < 50 || summary.length > 500) {
        return res.status(400).json({
            success: false,
            message: 'Summary must be between 50 and 500 characters',
            data: null
        });
    }

    next();
};

/**
 * Validates pagination parameters
 */
const validatePagination = (req, res, next) => {
    let { page = 1, limit = 10 } = req.query;
    
    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) {
        return res.status(400).json({
            success: false,
            message: 'Page must be a positive number',
            data: null
        });
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
        return res.status(400).json({
            success: false,
            message: 'Limit must be between 1 and 100',
            data: null
        });
    }

    req.query.page = page;
    req.query.limit = limit;
    next();
};

/**
 * Validates news status update
 */
const validateStatusUpdate = (req, res, next) => {
    const { status } = req.body;
    const validStatuses = ['draft', 'published', 'archived'];

    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status. Must be one of: draft, published, archived',
            data: null
        });
    }

    next();
};

/**
 * Validates news category data
 */
const validateCategoryPayload = (req, res, next) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
        return res.status(400).json({
            success: false,
            message: 'Category name must be between 2 and 50 characters',
            data: null
        });
    }

    // Clean the name
    req.body.name = name.trim();
    next();
};

module.exports = {
    validateObjectId,
    isAuthenticated,
    isAdmin,
    validateNewsPayload,
    validatePagination,
    validateStatusUpdate,
    validateCategoryPayload
};
