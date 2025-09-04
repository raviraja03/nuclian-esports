const NewsService = require('./news.service');

/**
 * Create a new news article
 * @route POST /api/news
 */
exports.createNews = async (req, res) => {
    try {
        const news = await NewsService.createNews(req.body, req.user.id);
        
        res.status(201).json({
            success: true,
            message: 'News article created successfully',
            data: news
        });
    } catch (error) {
        const status = error.message.includes('already exists') ? 409 : 400;
        res.status(status).json({
            success: false,
            message: 'Error creating news article',
            error: error.message
        });
    }
};

/**
 * Update an existing news article
 * @route PUT /api/news/:id
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
            message: 'News article updated successfully',
            data: news
        });
    } catch (error) {
        let status = 400;
        if (error.message === 'News not found') {
            status = 404;
        } else if (error.message.includes('already exists')) {
            status = 409;
        }

        res.status(status).json({
            success: false,
            message: error.message,
            error: error.stack
        });
    }
};

/**
 * Delete (soft delete) a news article
 * @route DELETE /api/news/:id
 */
exports.deleteNews = async (req, res) => {
    try {
        await NewsService.deleteNews(req.params.id, req.user.id);

        res.json({
            success: true,
            message: 'News article deleted successfully',
            data: null
        });
    } catch (error) {
        let status = 400;
        if (error.message === 'News not found') {
            status = 404;
        } else if (error.message.includes('deletion restricted')) {
            status = 403;
        }

        res.status(status).json({
            success: false,
            message: error.message,
            error: error.stack
        });
    }
};

/**
 * Update news status (draft/published/archived)
 * @route PATCH /api/news/:id/status
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
        let status = 400;
        if (error.message === 'News not found') {
            status = 404;
        } else if (error.message === 'Invalid status value') {
            status = 422;
        }

        res.status(status).json({
            success: false,
            message: error.message,
            error: error.stack
        });
    }
};

/**
 * Create a new news category
 * @route POST /api/news/categories
 */
exports.createCategory = async (req, res) => {
    try {
        const category = await NewsService.createCategory(
            req.body,
            req.user.id
        );

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category
        });
    } catch (error) {
        let status = 400;
        if (error.message === 'Category already exists') {
            status = 409;
        } else if (error.message.includes('validation failed')) {
            status = 422;
        }

        res.status(status).json({
            success: false,
            message: error.message,
            error: error.stack
        });
    }
};

/**
 * Get all news categories
 * @route GET /api/news/categories
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
        res.status(500).json({
            success: false,
            message: 'Internal server error while retrieving categories',
            error: error.stack
        });
    }
};

/**
 * Delete a news category
 * @route DELETE /api/news/categories/:id
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
        let status = 400;
        if (error.message === 'Category not found') {
            status = 404;
        } else if (error.message.includes('in use')) {
            status = 409;
        }

        res.status(status).json({
            success: false,
            message: error.message,
            error: error.stack
        });
    }
};

/**
 * Get all unique tags used in news articles
 * @route GET /api/news/tags
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
        res.status(500).json({
            success: false,
            message: 'Error retrieving tags',
            error: error.message
        });
    }
};
