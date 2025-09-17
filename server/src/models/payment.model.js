const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "completed", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    metadata: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

module.exports = Payment;
