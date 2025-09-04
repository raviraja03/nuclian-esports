const NewsService = require('./news.service');
const { StatusCodes } = require('../../../config/status-codes');

/**
 * Create a new news article
 */
exports.createNews = async (req, res) => {
    try {
        const news = await NewsService.createNews(req.body, req.user.id);
        
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'News created successfully',
            data: news
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Error creating news',
            error: error.message
        });
    }
};

/**
 * Update an existing news article
 */
exports.updateNews = async (req, res) => {
    try {
        const news = await NewsService.updateNews(
            req.params.id,
            req.body,
            req.user.id
        );

        res.json({
            success: true,
            message: 'News updated successfully',
            data: news
        });
    } catch (error) {
        res.status(error.message === 'News not found' ? 
            StatusCodes.NOT_FOUND : 
            StatusCodes.BAD_REQUEST
        ).json({
            success: false,
            message: error.message,
            error: error.message
        });
    }
};

/**
 * Delete (soft delete) a news article
 */
exports.deleteNews = async (req, res) => {
    try {
        await NewsService.deleteNews(req.params.id, req.user.id);

        res.json({
            success: true,
            message: 'News deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(error.message === 'News not found' ? 
            StatusCodes.NOT_FOUND : 
            StatusCodes.BAD_REQUEST
        ).json({
            success: false,
            message: error.message,
            error: error.message
        });
    }
};

/**
 * Update news status (draft/published/archived)
 */
exports.updateNewsStatus = async (req, res) => {
    try {
        const news = await NewsService.updateNewsStatus(
            req.params.id,
            req.body.status,
            req.user.id
        );

        res.json({
            success: true,
            message: 'News status updated successfully',
            data: news
        });
    } catch (error) {
        res.status(error.message === 'News not found' ? 
            StatusCodes.NOT_FOUND : 
            StatusCodes.BAD_REQUEST
        ).json({
            success: false,
            message: error.message,
            error: error.message
        });
    }
};

/**
 * Create a new news category
 */
exports.createCategory = async (req, res) => {
    try {
        const category = await NewsService.createCategory(
            req.body,
            req.user.id
        );

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Category created successfully',
            data: category
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Error creating category',
            error: error.message
        });
    }
};

/**
 * Get all news categories
 */
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await NewsService.getAllCategories();

        res.json({
            success: true,
            message: 'Categories retrieved successfully',
            data: categories
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error retrieving categories',
            error: error.message
        });
    }
};

/**
 * Delete a news category
 */
exports.deleteCategory = async (req, res) => {
    try {
        await NewsService.deleteCategory(req.params.id);

        res.json({
            success: true,
            message: 'Category deleted successfully',
            data: null
        });
    } catch (error) {
        res.status(error.message === 'Category not found' ? 
            StatusCodes.NOT_FOUND : 
            StatusCodes.BAD_REQUEST
        ).json({
            success: false,
            message: error.message,
            error: error.message
        });
    }
};

/**
 * Get all unique tags used in news articles
 */
exports.getAllTags = async (req, res) => {
    try {
        const tags = await NewsService.getAllTags();

        res.json({
            success: true,
            message: 'Tags retrieved successfully',
            data: tags
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error retrieving tags',
            error: error.message
        });
    }
};
