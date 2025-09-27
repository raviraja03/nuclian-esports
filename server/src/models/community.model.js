import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messageType: {
    type: String,
    enum: ['announcement', 'news', 'tournament_update', 'general', 'support'],
    required: true
  },
  content: {
    text: {
      type: String,
      required: true
    },
    media: [{
      type: {
        type: String,
        enum: ['image', 'video', 'document']
      },
      url: String,
      metadata: mongoose.Schema.Types.Mixed
    }]
  },
  platform: {
    type: String,
    enum: ['whatsapp', 'in_app', 'email', 'sms'],
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'sent', 'failed'],
    default: 'draft'
  },
  scheduledFor: Date,
  sentAt: Date,
  recipients: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'sent', 'delivered', 'read', 'failed'],
      default: 'pending'
    },
    deliveredAt: Date,
    readAt: Date,
    metadata: mongoose.Schema.Types.Mixed
  }],
  metadata: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

// Indexes
communitySchema.index({ userId: 1, messageType: 1 });
communitySchema.index({ platform: 1, status: 1 });
communitySchema.index({ scheduledFor: 1 }, { expireAfterSeconds: 0 });
communitySchema.index({ 'recipients.userId': 1 });

const Community = mongoose.model('Community', communitySchema);

export default Community; 