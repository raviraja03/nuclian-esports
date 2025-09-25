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
      name: { type: String, trim: true },
      members: [
        {
          _id: false,
          gameId: { type: String, trim: true }, // Player's game ID
          gameName: { type: String, trim: true }, // Player's game name
          role: {
            type: String,
            enum: ["leader", "member"],
            default: "member",
          },
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

// Create compound index to ensure gameId is unique per tournament

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

module.exports = Registration;
