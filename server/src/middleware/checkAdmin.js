// Dummy admin auth middleware for demonstration

const checkAdmin = (req, res, next) => {
  if (!req.user) {
    // Not logged in
    return res.status(401).json({ message: 'Authentication required' });
  }
  if (req.user.role !== 'admin') {
    // Not an admin
    // Optionally log: console.warn(`Unauthorized admin access by user ${req.user._id}`);
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { checkAdmin };
