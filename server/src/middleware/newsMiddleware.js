const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { StatusCodes } = require('../config/status-codes');
const { StatusMessages } = require('../config/status-message');

/**
 * Validates if the given parameter is a valid MongoDB ObjectId
 */
const validateObjectId = (param) => (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
        return res.status(StatusCodes.BAD_REQUEST).json({
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
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: StatusMessages.AUTH_REQUIRED,
                data: null
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: StatusMessages.INVALID_TOKEN,
            data: null
        });
    }
};

/**
 * Checks if user has admin role
 */
const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.roles?.includes('admin')) {
        return res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: StatusMessages.ADMIN_REQUIRED,
            data: null
        });
    }
    next();
};

/**
 * Validates news creation/update payload
 */
const validateNewsPayload = (req, res, next) => {
    const { headline, summary, content, category } = req.body;

    if (!headline || !summary || !content) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Headline, summary, and content are required',
            data: null
        });
    }

    if (headline.length < 10 || headline.length > 200) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Headline must be between 10 and 200 characters',
            data: null
        });
    }

    if (summary.length < 50 || summary.length > 500) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Summary must be between 50 and 500 characters',
            data: null
        });
    }

    if (content.length < 100) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Content must be at least 100 characters long',
            data: null
        });
    }

    next();
};

/**
 * Validates category creation payload
 */
const validateCategoryPayload = (req, res, next) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Category name is required',
            data: null
        });
    }

    if (name.length < 3 || name.length > 50) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Category name must be between 3 and 50 characters',
            data: null
        });
    }

    if (description && description.length > 200) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Category description must not exceed 200 characters',
            data: null
        });
    }

    next();
};

/**
 * Validates pagination query parameters
 */
const validatePagination = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1 || limit > 100) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Invalid pagination parameters. Page must be >= 1 and limit must be between 1 and 100',
            data: null
        });
    }

    req.pagination = { page, limit };
    next();
};

module.exports = {
    validateObjectId,
    isAuthenticated,
    isAdmin,
    validateNewsPayload,
    validateCategoryPayload,
    validatePagination
};
