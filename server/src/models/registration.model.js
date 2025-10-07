import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    tournamentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    participantType: {
      type: String,
      enum: ["solo", "duo", "squad"],
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    teamID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
      default: null,
    },
    status: {
      type: String,
      enum: ["registered", "waitlisted", "disqualified"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "free"],
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

  registrationSchema.index({ tournamentID: 1, paymentStatus: 1 });
  // Prevent duplicate registration per tournament per user
  registrationSchema.index(
    { tournamentID: 1, userID: 1 },
    { unique: true, partialFilterExpression: { userID: { $exists: true } } }
  );
  // Optional: index for team queries
  registrationSchema.index({ teamID: 1 });

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

export default Registration;
