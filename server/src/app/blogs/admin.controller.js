const Blog = require('../../../models/blog.model');

exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      ...req.body,
      createdBy: req.user.id
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
        data: null
      });
    }

    Object.assign(blog, req.body, { updatedBy: req.user.id });
    await blog.save();

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
        data: null
      });
    }

    blog.isDeleted = true;
    blog.updatedBy = req.user.id;
    await blog.save();

    res.json({
      success: true,
      message: 'Blog deleted successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      data: null
    });
  }
};

exports.toggleBlogStatus = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
        data: null
      });
    }

    await blog.toggleStatus(req.body.status);

    res.json({
      success: true,
      message: 'Blog status updated successfully',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

exports.getAdminBlogs = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10,
      status,
      category,
      search,
      startDate,
      endDate
    } = req.query;

    const query = { isDeleted: false };

    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .populate('createdBy', 'name')
        .populate('updatedBy', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(query)
    ]);

    res.json({
      success: true,
      message: 'Blogs retrieved successfully',
      data: {
        blogs,
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
      message: 'Error retrieving blogs',
      data: null
    });
  }
};

exports.reviewBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
        data: null
      });
    }

    const { status, reviewNotes } = req.body;
    await blog.toggleStatus(status);

    blog.reviewNotes = reviewNotes;
    blog.reviewedBy = req.user.id;
    blog.reviewedAt = new Date();
    await blog.save();

    res.json({
      success: true,
      message: 'Blog reviewed successfully',
      data: blog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: null
    });
  }
};
