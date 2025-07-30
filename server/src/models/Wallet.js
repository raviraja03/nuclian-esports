import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  coins: {
    type: Number,
    required: true
  },
  razorpayPaymentId: String,
  razorpayOrderId: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  description: String,
  metadata: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  razorpayCustomerId: {
    type: String,
    unique: true,
    sparse: true
  },
  coins: {
    type: Number,
    default: 0,
    min: 0
  },
  transactionHistory: [transactionSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
walletSchema.index({ userId: 1 });
walletSchema.index({ razorpayCustomerId: 1 });
walletSchema.index({ 'transactionHistory.razorpayPaymentId': 1 });

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet; 