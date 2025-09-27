// Handles JWT token generation and verification
import jwt from "jsonwebtoken";
import "dotenv/config";


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

export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
if (process.env.NODE_ENV === "production") {
  cookieOptions.domain = process.env.COOKIE_DOMAIN;
}
export const cookieOptionsForClearCookie = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
};
if (process.env.NODE_ENV === "production") {
  cookieOptionsForClearCookie.domain = process.env.COOKIE_DOMAIN;
}


