const News = require('../../models/News');
const { handleError } = require('../../middleware/newsMiddleware');
const slugify = require('slugify');

// POST /api/news
exports.createNews = async (req, res) => {
  try {
    const { title, content, imageUrl, tags, author, metadata } = req.body;
    if (!title || !content) return res.status(400).json({ success: false, message: 'Title and content are required' });
    const news = new News({
      title,
      content,
      imageUrl,
      tags,
      author,
      metadata,
      status: 'draft'
    });
    news.generateSlug();
    await news.save();
    res.status(201).json({ success: true, message: 'News created', data: news });
  } catch (err) {
    handleError(res, err);
  }
};

// PUT /api/news/:id
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    if (update.title) update.slug = slugify(update.title, { lower: true, strict: true });
    const news = await News.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!news) return res.status(404).json({ success: false, message: 'News not found' });
    res.json({ success: true, message: 'News updated', data: news });
  } catch (err) {
    handleError(res, err);
  }
};

// DELETE /api/news/:id
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);
    if (!news) return res.status(404).json({ success: false, message: 'News not found' });
    res.json({ success: true, message: 'News deleted' });
  } catch (err) {
    handleError(res, err);
  }
};

// PATCH /api/news/:id/status
exports.toggleNewsStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['draft', 'published'].includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' });
    const update = { status };
    if (status === 'published') update.publishedAt = new Date();
    else update.publishedAt = null;
    const news = await News.findByIdAndUpdate(id, update, { new: true });
    if (!news) return res.status(404).json({ success: false, message: 'News not found' });
    res.json({ success: true, message: `News ${status === 'published' ? 'published' : 'unpublished'}`, data: news });
  } catch (err) {
    handleError(res, err);
  }
};

// POST /api/news/categories
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Category name required' });
    // Check if category exists in any news metadata
    const exists = await News.findOne({ 'metadata.category': name });
    if (exists) return res.status(400).json({ success: false, message: 'Category already exists' });
    // No separate Category collection, just acknowledge creation
    res.status(201).json({ success: true, message: 'Category created', data: { name } });
  } catch (err) {
    handleError(res, err);
  }
};

// GET /api/news/categories
exports.getCategories = async (req, res) => {
  try {
    // Get all unique categories from news metadata
    const categories = await News.distinct('metadata.category');
    res.json({ success: true, message: 'Fetched categories', data: categories.filter(Boolean) });
  } catch (err) {
    handleError(res, err);
  }
};

// DELETE /api/news/categories/:id
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    // Remove category from all news documents
    const result = await News.updateMany(
      { 'metadata.category': id },
      { $unset: { 'metadata.category': '' } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: 'Category not found in any news' });
    }
    res.json({ success: true, message: 'Category deleted from news', data: { category: id } });
  } catch (err) {
    handleError(res, err);
  }
};

// GET /api/news/tags
exports.getTags = async (req, res) => {
  try {
    const tags = await News.distinct('tags');
    res.json({ success: true, message: 'Fetched tags', data: tags });
  } catch (err) {
    handleError(res, err);
  }
};
