const News = require('../../../models/News');
const { handleError } = require('../../../middleware/newsMiddleware');

// GET /api/news
exports.getAllNews = async (req, res) => {
  try {
    const { search, category, tag, page = 1, limit = 10 } = req.query;
    const filters = {};
    if (category) filters['metadata.category'] = category;
    if (tag) filters.tags = tag;
    let query = News.getPublished(filters);
    if (search) {
      query = News.search(search, filters);
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const news = await query.skip(skip).limit(parseInt(limit)).sort({ publishedAt: -1 });
    const total = await News.countDocuments({ status: 'published', ...filters });
    res.json({ success: true, message: 'Fetched news', data: { news, total, page: Number(page), limit: Number(limit) } });
  } catch (err) {
    handleError(res, err);
  }
};

// GET /api/news/:slugOrId
exports.getNewsBySlugOrId = async (req, res) => {
  try {
    const { slugOrId } = req.params;
    let news;
    if (/^[0-9a-fA-F]{24}$/.test(slugOrId)) {
      news = await News.findOne({ _id: slugOrId, status: 'published' });
    } else {
      news = await News.findOne({ slug: slugOrId, status: 'published' });
    }
    if (!news) return res.status(404).json({ success: false, message: 'News not found' });
    res.json({ success: true, message: 'Fetched news', data: news });
  } catch (err) {
    handleError(res, err);
  }
};
