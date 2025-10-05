import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
      tournamentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
      
    },
    registrationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      
    },
    amount: {
      type: Number,
      required: true,
    },
    orderID: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "completed", "failed"],
      default: "pending",
    },
    transactionID: {
      type: String,
        required: true,

    },
    metadata: {
      type: Object,
    },
  },
  { timestamps: true }
);

paymentSchema.index({ userID: 1, tournamentID: 1 });
paymentSchema.index({ tournamentID: 1, status: 1 });
paymentSchema.index({ registrationID: 1 });

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default  Payment;
