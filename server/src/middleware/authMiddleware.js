import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - verify JWT
export const protect = async (req, res, next) => {
  let token = req.cookies?.token;
  if (!token || typeof token !== 'string') {
    return res.status(401).json({
      success: false,
      error: 'Not authorized'
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
}; 