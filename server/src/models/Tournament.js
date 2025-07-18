import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['registered', 'checked-in', 'playing', 'eliminated', 'winner'],
    default: 'registered'
  },
  position: Number,
  metadata: mongoose.Schema.Types.Mixed
});

const tournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['solo', 'duo', 'squad'],
    required: true
  },
  game: {
    type: String,
    required: true
  },
  schedule: {
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    checkInStart: Date,
    checkInEnd: Date
  },
  participants: [participantSchema],
  maxParticipants: {
    type: Number,
    required: true
  },
  entryFee: {
    coins: {
      type: Number,
      default: 0
    },
    currency: {
      type: Number,
      default: 0
    }
  },
  prizePool: {
    distribution: [{
      position: Number,
      coins: Number,
      currency: Number
    }],
    totalCoins: Number,
    totalCurrency: Number
  },
  rules: [String],
  status: {
    type: String,
    enum: ['draft', 'published', 'registration-closed', 'in-progress', 'completed', 'cancelled'],
    default: 'draft'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  metadata: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

// Indexes
tournamentSchema.index({ status: 1, 'schedule.startTime': 1 });
tournamentSchema.index({ createdBy: 1 });
tournamentSchema.index({ 'participants.userId': 1 });
tournamentSchema.index({ game: 1, type: 1 });

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament; 