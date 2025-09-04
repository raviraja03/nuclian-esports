const NewsService = require('./news.service');
const { StatusCodes } = require('../../../config/status-codes');

/**
 * Get all published news with filters and pagination
 */
exports.getAllNews = async (req, res) => {
    try {
        const { search, category, tag } = req.query;
        const filters = { search, category, tag };
        const pagination = req.pagination;

        const result = await NewsService.getPublishedNews(filters, pagination);

        res.json({
            success: true,
            message: 'News retrieved successfully',
            data: result
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error retrieving news',
            error: error.message
        });
    }
};

/**
 * Get a single news article by slug or ID
 */
exports.getNewsBySlugOrId = async (req, res) => {
    try {
        const { slugOrId } = req.params;
        const news = await NewsService.getNewsBySlugOrId(slugOrId);

        if (!news) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'News not found',
                data: null
            });
        }

        res.json({
            success: true,
            message: 'News retrieved successfully',
            data: news
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error retrieving news',
            error: error.message
        });
    }
};
