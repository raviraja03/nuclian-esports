import Session from "../models/session.model.js";

const getClientIp = (req) => {
  // 1. Check x-forwarded-for (essential if you are behind Nginx/Vercel/AWS LB)
  const xForwardedFor = req.headers["x-forwarded-for"];
  let ip = xForwardedFor ? xForwardedFor.split(",")[0].trim() : req.ip;

  // 2. Clean up IPv6 mapped IPv4 addresses (::ffff:127.0.0.1 -> 127.0.0.1)
  if (ip && ip.includes("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }

  // 3. Handle Localhost IPv6
  if (ip === "::1") return "127.0.0.1";

  return ip || "0.0.0.0";
};

export const createSession = async (user, req) => {
  try {
    // --- START: PRODUCTION SESSION LOGIC ---

    const MAX_ACTIVE_SESSIONS = 5;
    const ipAddress = getClientIp(req);
    const userAgent = req.get("user-agent") || "unknown";

    // 1. Find existing active sessions for this user
    const activeSessions = await Session.find({
      user: user._id,
      isRevoked: false,
    }).sort({ createdAt: 1 }); // Sort by oldest first

    // 2. If limit reached, revoke the OLDEST session (Session Rotation)
    if (activeSessions.length >= MAX_ACTIVE_SESSIONS) {
      const oldestSession = activeSessions[0];
      await Session.findByIdAndUpdate(oldestSession._id, { isRevoked: true });
      // Optional: Log this revocation for auditing
    }

    // 3. Create the new session
    const refreshTokenTTLms = 7 * 24 * 60 * 60 * 1000;
    const session = await Session.create({
      user: user._id,
      userAgent: userAgent,
      ipAddress: ipAddress,
      expiresAt: new Date(Date.now() + refreshTokenTTLms),
    });
    return session;
    // --- END: PRODUCTION SESSION LOGIC ---4
  } catch (er) {
    throw er;
  }
};
