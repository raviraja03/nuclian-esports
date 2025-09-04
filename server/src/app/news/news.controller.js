const NewsService = require('./news.service');

/**
 * Get all published news with filters and pagination
 * @route GET /api/news
 */
exports.getAllNews = async (req, res) => {
    try {
        const { search, category, tag } = req.query;
        const filters = { search, category, tag };
        const pagination = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        };

        const result = await NewsService.getPublishedNews(filters, pagination);

        res.json({
            success: true,
            message: 'News articles retrieved successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving news articles',
            error: error.message
        });
    }
};

/**
 * Get a single news article by slug or ID
 * @route GET /api/news/:slugOrId
 */
exports.getNewsBySlugOrId = async (req, res) => {
    try {
        const news = await NewsService.getNewsBySlugOrId(req.params.slugOrId);

        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'News article not found',
                data: null
            });
        }

        res.json({
            success: true,
            message: 'News article retrieved successfully',
            data: news
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving news article',
            error: error.message
        });
    }
};
