const express = require('express');
const { validatePagination, validateFilters } = require('../../../middleware/newsMiddleware');
const { getAllNews, getNewsBySlugOrId } = require('./news.controller');
const asyncHandler = require('../../../middleware/asyncHandler');

const router = express.Router();

/**
 * @route   GET /api/news
 * @desc    Get all published news with filters and pagination
 * @access  Public
 */
router.get('/api/news',
    validatePagination,
    getAllNews
);

/**
 * @route   GET /api/news/:slugOrId
 * @desc    Get a single news article by slug or ID
 * @access  Public
 */
router.get('/api/news/:slugOrId',
    getNewsBySlugOrId
);

module.exports = router;
