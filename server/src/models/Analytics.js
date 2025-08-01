const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activityType: {
    type: String,
    enum: [
      'login',
      'tournament_view',
      'tournament_register',
      'tournament_play',
      'wallet_transaction',
      'profile_update',
      'community_interaction'
    ],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  performanceMetrics: {
    tournaments: {
      participated: Number,
      won: Number,
      totalEarnings: Number
    },
    engagement: {
      lastActive: Date,
      sessionDuration: Number,
      activityFrequency: Number
    },
    wallet: {
      totalDeposits: Number,
      totalWithdrawals: Number,
      averageTransactionValue: Number
    }
  },
  metadata: {
    deviceInfo: {
      type: String,
      userAgent: String,
      platform: String
    },
    location: {
      country: String,
      region: String,
      city: String
    },
    ipAddress: String,
    additionalData: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Indexes
analyticsSchema.index({ userId: 1, activityType: 1 });
analyticsSchema.index({ timestamp: 1 });
analyticsSchema.index({ 'performanceMetrics.tournaments.totalEarnings': -1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics; 