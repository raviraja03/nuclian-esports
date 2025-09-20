const mongoose = require("mongoose");
const registrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" }, // optional
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
