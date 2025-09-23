const mongoose = require("mongoose");
const registrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
      team: {
      leaderName: { type: String, trim: true }, // Leader's name
      name: { type: String, trim: true }, // Optional team name
      members: [
        {
          gameId: { type: String, trim: true }, // Player's game ID
          role: {
            type: String,
            enum: ["leader", "member"],
            default: "member",
          },
          joinedAt: { type: Date, default: Date.now },
        },
      ],
    },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" }, 
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

module.exports = Registration;
