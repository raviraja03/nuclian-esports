const express = require('express');
const { validateObjectId, isAuthenticated } = require('../../../middleware/blogMiddleware');
const {
  getBlogs,
  getBlogByIdOrSlug,
  getBlogComments,
  createComment
} = require('./blogs.controller');

const router = express.Router();

// Get all published blogs with filters
router.get('/api/blogs', getBlogs);

// Get a single blog by ID or slug
router.get('/api/blogs/:idOrSlug', getBlogByIdOrSlug);

// Get comments for a blog
router.get(
  '/api/blogs/:blogId/comments',
  validateObjectId('blogId'),
  getBlogComments
);

// Create a comment on a blog (authenticated users only)
router.post(
  '/api/blogs/:blogId/comments',
  isAuthenticated,
  validateObjectId('blogId'),
  createComment
);

module.exports = router;
