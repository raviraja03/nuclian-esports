import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userAgent: {
      type: String,
      required: false, // Sometimes headers are stripped, so not required
    },
    ipAddress: {
      type: String,
      required: true,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// TTL Index: Automatically deletes the document when 'expiresAt' time is reached
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); 

const Session = mongoose.model("Session", sessionSchema);
export default Session;