// Handles JWT token generation and verification
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Secreet";

export function generateToken(payload) {
  // Generates a JWT token with 7 days expiry
  const expires = "7d";
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expires });
}

export function verifyToken(token) {
  // Verifies a JWT token and returns the decoded payload
  return jwt.verify(token, JWT_SECRET);
}
