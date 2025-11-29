// Handles JWT token generation and verification
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = "15m"; // short
const REFRESH_TOKEN_EXPIRES_IN = "7d"; // long



export function verifyToken(token) {
  // Verifies a JWT token and returns the decoded payload
  return jwt.verify(token, JWT_SECRET);
}

//generate
export const generateAccessToken = (userId) => {
  return jwt.sign({ sub: userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const generateRefreshToken = (sessionId) => {
  return jwt.sign({ sid: sessionId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

//verify
export const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};
export const accessTokenCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
  maxAge: 15 * 60 * 1000, // 15 mins
};

export const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const clearCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
};

if (process.env.NODE_ENV === "production") {
  accessTokenCookieOptions.domain = process.env.COOKIE_DOMAIN;
  refreshTokenCookieOptions.domain = process.env.COOKIE_DOMAIN;
  clearCookieOptions.domain = process.env.COOKIE_DOMAIN;
}