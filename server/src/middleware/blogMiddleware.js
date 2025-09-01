const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { StatusCodes } = require('../config/status-codes');
const { StatusMessages } = require('../config/status-message');

/**
 * Validates if the given parameter is a valid MongoDB ObjectId
 * @param {string} param - The parameter name to validate from req.params
 */
const validateObjectId = (param) => (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: StatusMessages.INVALID_ID,
            data: null
        });
    }
    next();
};

/**
 * Validates blog creation/update payload
 */
const validateBlogPayload = (req, res, next) => {
    const { title, content, category } = req.body;

    if (!title || !content) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Title and content are required',
            data: null
        });
    }

    if (title.length < 5 || title.length > 100) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Title must be between 5 and 100 characters',
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

    if (category && category.length < 3) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Category must be at least 3 characters long',
            data: null
        });
    }

    next();
};

/**
 * Validates comment creation payload
 */
const validateCommentPayload = (req, res, next) => {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Comment content is required',
            data: null
        });
    }

    if (content.length > 500) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Comment must not exceed 500 characters',
            data: null
        });
    }

    next();
};

/**
 * Validates blog status update payload
 */
const validateStatusUpdate = (req, res, next) => {
    const { status } = req.body;
    const validStatuses = ['draft', 'published', 'archived'];

    if (!status || !validStatuses.includes(status)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Invalid status value. Must be one of: draft, published, archived',
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
    if (!req.user || !req.user.roles.includes('admin')) {
        return res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: StatusMessages.ADMIN_REQUIRED,
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

/**
 * Validates blog filters in query parameters
 */
const validateFilters = (req, res, next) => {
    const { startDate, endDate } = req.query;

    if (startDate && !isValidDate(startDate)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Invalid startDate format. Use YYYY-MM-DD',
            data: null
        });
    }

    if (endDate && !isValidDate(endDate)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Invalid endDate format. Use YYYY-MM-DD',
            data: null
        });
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'startDate cannot be later than endDate',
            data: null
        });
    }

    next();
};

// Helper function to validate date format
const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
};

module.exports = {
    validateObjectId,
    validateBlogPayload,
    validateCommentPayload,
    validateStatusUpdate,
    validatePagination,
    validateFilters,
    isAuthenticated,
    isAdmin
};
