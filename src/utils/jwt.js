// Handles JWT token generation and verification
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "Secreet";

function generateToken(payload) {
  // Generates a JWT token with 7 days expiry
  const expires = "7d";
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: expires });
  return token;
}

function verifyToken(token) {
  // Verifies a JWT token and returns the decoded payload
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  generateToken,
  verifyToken,
};