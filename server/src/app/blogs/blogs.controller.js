const Blog = require('../../../models/blog.model');
const Comment = require('../../../models/Comment');
const mongoose = require('mongoose');

exports.getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tag } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (tag) filters.tags = tag;

    const result = await Blog.getPublished(filters, page, limit);

    res.json({
      success: true,
      message: 'Blogs retrieved successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving blogs',
      data: null
    });
  }
};

exports.getBlogByIdOrSlug = async (req, res) => {
  try {
    const param = req.params.idOrSlug;
    const query = mongoose.Types.ObjectId.isValid(param)
      ? { _id: param }
      : { slug: param };

    const blog = await Blog.findOne({
      ...query,
      status: 'published',
      isDeleted: false
    }).populate('createdBy', 'name');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
        data: null
      });
    }

    res.json({
      success: true,
      message: 'Blog retrieved successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving blog',
      data: null
    });
  }
};

exports.getBlogComments = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      Comment.find({ blogId: req.params.blogId })
        .populate('userId', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Comment.countDocuments({ blogId: req.params.blogId })
    ]);

    res.json({
      success: true,
      message: 'Comments retrieved successfully',
      data: {
        comments,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving comments',
      data: null
    });
  }
};

exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({
      blogId: req.params.blogId,
      userId: req.user.id,
      content: req.body.content
    });

    await comment.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate('userId', 'name');

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: populatedComment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};
