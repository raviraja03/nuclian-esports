const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

// Registration route
// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', userController.register);

// Login route
// @route   POST /api/users/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', userController.login);

// Get user profile (protected)
// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
