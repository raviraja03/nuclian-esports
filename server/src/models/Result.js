import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  screenshotURLs: [{
    type: String,
    required: true
  }],
  winners: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    reward: {
      coins: Number,
      currency: Number,
      metadata: mongoose.Schema.Types.Mixed
    }
  }],
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verificationTime: Date,
  rejectionReason: String,
  metadata: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

// Indexes
resultSchema.index({ tournamentId: 1 });
resultSchema.index({ 'winners.userId': 1 });
resultSchema.index({ verificationStatus: 1 });

const Result = mongoose.model('Result', resultSchema);

export default Result; 