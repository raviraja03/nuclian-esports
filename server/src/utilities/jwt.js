// Handles JWT token generation and verification
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || "Secreet";

function generateToken(payload) {
  // Generates a JWT token with 7 days expiry
  const expires = "7d";
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expires });
}

function verifyToken(token) {
  // Verifies a JWT token and returns the decoded payload
  return jwt.verify(token, JWT_SECRET);
}

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
if (process.env.NODE_ENV === "production") {
  cookieOptions.domain = process.env.COOKIE_DOMAIN;
}
const cookieOptionsForClearCookie = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
};
if (process.env.NODE_ENV === "production") {
  cookieOptionsForClearCookie.domain = process.env.COOKIE_DOMAIN;
}

module.exports = {
  generateToken,
  verifyToken,
  cookieOptions,
  cookieOptionsForClearCookie,
};
