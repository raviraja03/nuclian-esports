const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { CustomError, GlobalErrorHandler } = require("./errorMiddleware");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Use environment variable in production

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

const protect = GlobalErrorHandler(async (req, res, next) => {
  let token;
  token = req.cookies.sessionId;
  // Get token from header
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }

  if (!token) {
    return next(
      new CustomError(
        `You are not logged in! Please login to get access..`,
        401
      )
    );
  }

  // Verify token
  const decoded = jwt.verify(token, JWT_SECRET);

  // Get user from token
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new CustomError("This user no longer exist", 401));
  }

  if (user.isSuspended) {
    return next(new CustomError("Your account has been suspended", 403));
  }

  if (user.isDeleted) {
    return next(new CustomError("Your account has been deleted", 403));
  }

  req.user = user;
  next();
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomError("You are not authorized to access this route", 403)
      );
    }
    next();
  };
};

const optionalAuth = GlobalErrorHandler(async (req, res, next) => {
  let token = req.cookies.sessionId;
  if (!token) {
    req.user = null; 
    return next();
  }

 
  const decoded = jwt.verify(token, JWT_SECRET);

  // Get user from token
  const user = await User.findById(decoded.id);
  if (!user) {
    res.clearCookie('sessionId');
    return next(new CustomError("This user no longer exist", 401));
  }

  if (user.isSuspended) {
    return next(new CustomError("Your account has been suspended", 403));
  }

  if (user.isDeleted) {
    return next(new CustomError("Your account has been deleted", 403));
  }

  req.user = user;
  next();
});





module.exports = {
  generateToken,
  protect,
  authorize,
  optionalAuth
};
