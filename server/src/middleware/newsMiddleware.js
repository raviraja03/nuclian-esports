const mongoose = require('mongoose');

// Validate ObjectId
exports.validateObjectId = (param) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[param])) {
    return res.status(400).json({ success: false, message: `Invalid ObjectId for ${param}` });
  }
  next();
};

// Admin check
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

// Centralized error handler for news
exports.handleError = (res, err) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message });
  }
  res.status(500).json({ success: false, message: 'Server error', error: err.message });
};
