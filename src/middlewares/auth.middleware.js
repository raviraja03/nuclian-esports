// JWT authentication middleware
const jwt = require('../utils/jwt');

function authMiddleware(req, res, next) {
  // Checks for JWT token in Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    // Verifies token and attaches user to request
    const decoded = jwt.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
