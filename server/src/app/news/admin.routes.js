const express = require('express');
const {
    validateObjectId,
    isAuthenticated,
    isAdmin,
    validateNewsPayload
} = require('../../../middleware/newsMiddleware');

const {
    createNews,
    updateNews,
    deleteNews,
    updateNewsStatus,
    createCategory,
    getAllCategories,
    deleteCategory,
    getAllTags
} = require('./admin.controller');

const router = express.Router();

// Apply authentication and admin middleware to all routes
router.use(isAuthenticated, isAdmin);

/**
 * @route   POST /api/news
 * @desc    Create a new news article
 * @access  Admin
 */
router.post('/api/news',
    validateNewsPayload,
    createNews
);

/**
 * @route   PUT /api/news/:id
 * @desc    Update an existing news article
 * @access  Admin
 */
router.put('/api/news/:id',
    validateObjectId('id'),
    validateNewsPayload,
    updateNews
);

/**
 * @route   DELETE /api/news/:id
 * @desc    Delete (soft delete) a news article
 * @access  Admin
 */
router.delete('/api/news/:id',
    validateObjectId('id'),
    deleteNews
);

/**
 * @route   PATCH /api/news/:id/status
 * @desc    Update news status (draft/published/archived)
 * @access  Admin
 */
router.patch('/api/news/:id/status',
    validateObjectId('id'),
    validateStatusUpdate,
    updateNewsStatus
);

/**
 * @route   POST /api/news/categories
 * @desc    Create a new news category
 * @access  Admin
 */
router.post('/api/news/categories',
    validateCategoryPayload,
    createCategory
);

/**
 * @route   GET /api/news/categories
 * @desc    Get all news categories
 * @access  Admin
 */
router.get('/api/news/categories',
    getAllCategories
);

/**
 * @route   DELETE /api/news/categories/:id
 * @desc    Delete a news category
 * @access  Admin
 */
router.delete('/api/news/categories/:id',
    validateObjectId('id'),
    deleteCategory
);

/**
 * @route   GET /api/news/tags
 * @desc    Get all unique tags used in news articles
 * @access  Admin
 */
router.get('/api/news/tags',
    getAllTags
);

module.exports = router;
