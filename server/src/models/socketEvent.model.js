import mongoose from 'mongoose';

const socketEventSchema = new mongoose.Schema({
  eventType: {
    type: String,
    enum: [
      'tournament_status_update',
      'match_update',
      'user_action',
      'chat_message',
      'notification',
      'system_event'
    ],
    required: true
  },
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  roomId: String,
  payload: mongoose.Schema.Types.Mixed,
  recipients: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    socketId: String,
    delivered: {
      type: Boolean,
      default: false
    },
    deliveredAt: Date
  }],
  metadata: {
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low'
    },
    retryCount: {
      type: Number,
      default: 0
    },
    expiresAt: Date
  }
}, {
  timestamps: true
});

// Indexes
socketEventSchema.index({ eventType: 1, createdAt: -1 });
socketEventSchema.index({ tournamentId: 1 });
socketEventSchema.index({ userId: 1 });
socketEventSchema.index({ 'recipients.userId': 1 });
socketEventSchema.index({ 'metadata.expiresAt': 1 }, { expireAfterSeconds: 0 });

const SocketEvent = mongoose.model('SocketEvent', socketEventSchema);

export default SocketEvent; 