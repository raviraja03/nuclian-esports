const express = require('express');
const { validateObjectId, isAuthenticated, isAdmin } = require('../../../middleware/blogMiddleware');
const {
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogStatus,
  getAdminBlogs,
  reviewBlog
} = require('./admin.controller');

const router = express.Router();

// Admin routes - all require authentication and admin role
router.use(isAuthenticated, isAdmin);

// Create new blog
router.post('/api/blogs', createBlog);

// Update blog
router.put(
  '/api/blogs/:blogId',
  validateObjectId('blogId'),
  updateBlog
);

// Delete blog
router.delete(
  '/api/blogs/:blogId',
  validateObjectId('blogId'),
  deleteBlog
);

// Toggle blog status
router.patch(
  '/api/blogs/:blogId/status',
  validateObjectId('blogId'),
  toggleBlogStatus
);

// Get all blogs (with admin filters)
router.get('/api/admin/blogs', getAdminBlogs);

// Review a blog
router.patch(
  '/api/admin/blogs/:blogId/review',
  validateObjectId('blogId'),
  reviewBlog
);

module.exports = router;
