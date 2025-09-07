const mongoose = require('mongoose');

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

// Instance methods
walletSchema.methods.creditWallet = function(amount, coins, description = '', metadata = {}) {
  const transaction = {
    type: 'credit',
    amount,
    coins,
    description,
    metadata,
    status: 'pending'
  };
  
  this.transactionHistory.push(transaction);
  return transaction;
};

walletSchema.methods.debitWallet = function(amount, coins, description = '', metadata = {}) {
  if (this.coins < coins) {
    throw new Error('Insufficient wallet balance');
  }
  
  const transaction = {
    type: 'debit',
    amount,
    coins,
    description,
    metadata,
    status: 'pending'
  };
  
  this.transactionHistory.push(transaction);
  this.coins -= coins;
  return transaction;
};

walletSchema.methods.completeTransaction = function(transactionId, newStatus = 'completed') {
  const transaction = this.transactionHistory.id(transactionId);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  
  transaction.status = newStatus;
  
  // Update balance for completed credit transactions
  if (newStatus === 'completed' && transaction.type === 'credit') {
    this.coins += transaction.coins;
  }
  
  return transaction;
};

walletSchema.methods.reverseTransaction = function(transactionId, adminId) {
  const originalTransaction = this.transactionHistory.id(transactionId);
  if (!originalTransaction) {
    throw new Error('Transaction not found');
  }
  
  if (originalTransaction.status !== 'completed') {
    throw new Error('Can only reverse completed transactions');
  }
  
  // Create reverse transaction
  const reverseType = originalTransaction.type === 'credit' ? 'debit' : 'credit';
  const reverseTransaction = {
    type: reverseType,
    amount: originalTransaction.amount,
    coins: originalTransaction.coins,
    description: `Reversal of transaction ${transactionId}`,
    metadata: {
      reversedBy: adminId,
      originalTransactionId: transactionId
    },
    status: 'completed'
  };
  
  // Update balance
  if (reverseType === 'debit') {
    if (this.coins < originalTransaction.coins) {
      throw new Error('Insufficient balance to reverse transaction');
    }
    this.coins -= originalTransaction.coins;
  } else {
    this.coins += originalTransaction.coins;
  }
  
  this.transactionHistory.push(reverseTransaction);
  return reverseTransaction;
};

// Static methods
walletSchema.statics.findOrCreateWallet = async function(userId) {
  let wallet = await this.findOne({ userId });
  if (!wallet) {
    wallet = new this({ userId });
    await wallet.save();
  }
  return wallet;
};

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet; 