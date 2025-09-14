const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Permission name is required'],
        unique: true,
        trim: true,
        minlength: [2, 'Permission name must be at least 2 characters'],
        maxlength: [50, 'Permission name cannot exceed 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Permission description is required'],
        trim: true,
        minlength: [5, 'Permission description must be at least 5 characters'],
        maxlength: [200, 'Permission description cannot exceed 200 characters']
    },
    key: {
        type: String,
        required: [true, 'Permission key is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-z_]+$/, 'Permission key can only contain lowercase letters and underscores'],
        minlength: [2, 'Permission key must be at least 2 characters'],
        maxlength: [30, 'Permission key cannot exceed 30 characters']
    },
    isActive: {
        type: Boolean,
        default: true
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

// Indexes
permissionSchema.index({ name: 1 });
permissionSchema.index({ key: 1 });
permissionSchema.index({ isActive: 1 });

// Instance methods
permissionSchema.methods.activate = function() {
    this.isActive = true;
    return this.save();
};

permissionSchema.methods.deactivate = function() {
    this.isActive = false;
    return this.save();
};

// Static methods
permissionSchema.statics.findByKey = function(key) {
    return this.findOne({ key, isActive: true });
};

permissionSchema.statics.findActivePermissions = function(filters = {}, pagination = {}) {
    const { page = 1, limit = 10 } = pagination;
    const query = { isActive: true, ...filters };
    
    return this.find(query)
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
};

permissionSchema.statics.getPermissionCount = function(filters = {}) {
    const query = { isActive: true, ...filters };
    return this.countDocuments(query);
};

// Pre-save middleware
permissionSchema.pre('save', function(next) {
    if (this.isModified('name')) {
        // Generate key from name if not provided
        if (!this.key) {
            this.key = this.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '');
        }
    }
    next();
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
