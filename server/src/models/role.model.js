import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  permissions: [{
    resource: {
      type: String,
      required: true,
      trim: true
    },
    actions: [{
      type: String,
      enum: ['create', 'read', 'update', 'delete', 'manage'],
      required: true
    }]
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for better query performance
roleSchema.index({ name: 1 }, { unique: true });
roleSchema.index({ isActive: 1 });

// Pre-save middleware to ensure role name is lowercase
roleSchema.pre('save', function(next) {
  this.name = this.name.toLowerCase();
  next();
});

// Static method to create default roles
roleSchema.statics.createDefaultRoles = async function(adminUserId) {
  const roles = [
    {
      name: 'admin',
      description: 'Super administrator with full system access',
      permissions: [
        {
          resource: 'all',
          actions: ['manage']
        }
      ],
      isDefault: true,
      createdBy: adminUserId
    },
    {
      name: 'user',
      description: 'Regular user with basic permissions',
      permissions: [
        {
          resource: 'profile',
          actions: ['read', 'update']
        },
        {
          resource: 'tournaments',
          actions: ['read', 'create']
        },
        {
          resource: 'matches',
          actions: ['read']
        }
      ],
      isDefault: true,
      createdBy: adminUserId
    },
    {
      name: 'moderator',
      description: 'Tournament moderator with tournament management permissions',
      permissions: [
        {
          resource: 'tournaments',
          actions: ['create', 'read', 'update', 'delete']
        },
        {
          resource: 'matches',
          actions: ['create', 'read', 'update']
        },
        {
          resource: 'users',
          actions: ['read']
        }
      ],
      isDefault: true,
      createdBy: adminUserId
    }
  ];

  return Promise.all(roles.map(role => this.create(role)));
};

const Role = mongoose.model('Role', roleSchema);

export default Role;
