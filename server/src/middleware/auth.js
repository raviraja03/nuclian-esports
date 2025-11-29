import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Session from "../models/session.model.js";
import { CustomError, GlobalErrorHandler } from "./errorMiddleware.js";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
  accessTokenCookieOptions,
} from "../utilities/jwt.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = GlobalErrorHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return next(new CustomError("Not authenticated", 401));
  }

  let decodedAccess;
  try {
    decodedAccess = verifyAccessToken(accessToken);
  } catch (err) {
    if (err.name !== "TokenExpiredError") {
      return next(new CustomError("Invalid access token", 401));
    }
    // Access token expired → try refresh
    if (!refreshToken) {
      return next(new CustomError("Session expired, please log in again", 401));
    }

    let decodedRefresh;
    try {
      decodedRefresh = verifyRefreshToken(refreshToken); // { sid }
    } catch (err) {
      return next(new CustomError("Session expired, please log in again", 401));
    }

    const session = await Session.findById(decodedRefresh.sid).populate("user");
    if (!session || session.isRevoked || !session.user) {
      return next(new CustomError("Session invalid, please log in again", 401));
    }

    // ✨ Issue New Access Token
    const newAccessToken = generateAccessToken(session.user._id);
    res.cookie("accessToken", newAccessToken, accessTokenCookieOptions);

    req.user = session.user;
    return next();
  }

  // Access Token Valid → continue
  const user = await User.findById(decodedAccess.sub);
  if (!user) {
    return next(new CustomError("User not found", 401));
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

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomError("You are not authorized to access this route", 403)
      );
    }
    next();
  };
};

export const optionalAuth = GlobalErrorHandler(async (req, res, next) => {
  let token = req.cookies.sessionId;
  if (!token) {
    req.user = null;
    return next();
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  // Get user from token
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new CustomError("This user no longer exists, Please log in again.", 401)
    );
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
