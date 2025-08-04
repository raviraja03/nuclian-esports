const mongoose = require('mongoose');

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
  teamName: {
    type: String,
    trim: true
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
  gameId: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true,
    enum: ['PC', 'Mobile', 'Console', 'Cross-Platform']
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
    checkInStart: {
      type: Date,
      required: true
    },
    checkInEnd: {
      type: Date,
      required: true
    }
  },
  participants: [participantSchema],
  maxParticipants: {
    type: Number,
    required: true
  },
  minParticipants: {
    type: Number,
    required: true,
    default: 2
  },
  entryFee: {
    coins: {
      type: Number,
      default: 0,
      min: 0
    },
    currency: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  prizePool: {
    distribution: [{
      position: {
        type: Number,
        required: true
      },
      coins: {
        type: Number,
        min: 0
      },
      currency: {
        type: Number,
        min: 0
      }
    }],
    totalCoins: {
      type: Number,
      min: 0
    },
    totalCurrency: {
      type: Number,
      min: 0
    }
  },
  rules: [String],
  status: {
    type: String,
    enum: ['draft', 'published', 'registration-open', 'registration-closed', 'check-in', 'in-progress', 'completed', 'cancelled'],
    default: 'draft'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  region: {
    type: String,
    required: true
  },
  streamLink: {
    type: String,
    trim: true
  },
  discordLink: {
    type: String,
    trim: true
  },
  metadata: mongoose.Schema.Types.Mixed,
  isVisible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
tournamentSchema.index({ status: 1, 'schedule.startTime': 1 });
tournamentSchema.index({ createdBy: 1 });
tournamentSchema.index({ 'participants.userId': 1 });
tournamentSchema.index({ game: 1, type: 1 });
tournamentSchema.index({ region: 1 });
tournamentSchema.index({ platform: 1 });
tournamentSchema.index({ isVisible: 1 });

// Validations
tournamentSchema.pre('save', function(next) {
  // Validate schedule times
  if (this.schedule.startTime >= this.schedule.endTime) {
    next(new Error('Tournament end time must be after start time'));
  }
  if (this.schedule.checkInStart >= this.schedule.checkInEnd) {
    next(new Error('Check-in end time must be after check-in start time'));
  }
  if (this.schedule.checkInEnd > this.schedule.startTime) {
    next(new Error('Check-in must end before tournament starts'));
  }
  
  // Validate min/max participants
  if (this.minParticipants > this.maxParticipants) {
    next(new Error('Minimum participants cannot be greater than maximum participants'));
  }
  
  next();
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament; 