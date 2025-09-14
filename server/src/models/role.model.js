const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Role name is required'],
        unique: true,
        trim: true,
        minlength: [2, 'Role name must be at least 2 characters'],
        maxlength: [50, 'Role name cannot exceed 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Role description is required'],
        trim: true,
        minlength: [5, 'Role description must be at least 5 characters'],
        maxlength: [200, 'Role description cannot exceed 200 characters']
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    isSystemRole: {
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

// Indexes
roleSchema.index({ name: 1 });
roleSchema.index({ isActive: 1 });
roleSchema.index({ isSystemRole: 1 });

// Virtual for users with this role
roleSchema.virtual('userCount', {
    ref: 'User',
    localField: '_id',
    foreignField: 'roles',
    count: true
});

// Instance methods
roleSchema.methods.activate = function() {
    this.isActive = true;
    return this.save();
};

roleSchema.methods.deactivate = function() {
    if (this.isSystemRole) {
        throw new Error('System roles cannot be deactivated');
    }
    this.isActive = false;
    return this.save();
};

roleSchema.methods.addPermission = function(permissionId) {
    if (!this.permissions.includes(permissionId)) {
        this.permissions.push(permissionId);
        return this.save();
    }
    return Promise.resolve(this);
};

roleSchema.methods.removePermission = function(permissionId) {
    this.permissions = this.permissions.filter(p => !p.equals(permissionId));
    return this.save();
};

roleSchema.methods.hasPermission = function(permissionKey) {
    return this.populate('permissions').then(() => {
        return this.permissions.some(p => p.key === permissionKey && p.isActive);
    });
};

roleSchema.methods.getActivePermissions = function() {
    return this.populate({
        path: 'permissions',
        match: { isActive: true },
        select: 'name description key'
    });
};

// Static methods
roleSchema.statics.findByName = function(name) {
    return this.findOne({ name, isActive: true });
};

roleSchema.statics.findActiveRoles = function(filters = {}, pagination = {}) {
    const { page = 1, limit = 10 } = pagination;
    const query = { isActive: true, ...filters };
    
    return this.find(query)
        .populate('permissions', 'name description key isActive')
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
};

roleSchema.statics.getRoleCount = function(filters = {}) {
    const query = { isActive: true, ...filters };
    return this.countDocuments(query);
};

roleSchema.statics.getSystemRoles = function() {
    return this.find({ isSystemRole: true, isActive: true })
        .populate('permissions', 'name description key isActive');
};

// Pre-save middleware
roleSchema.pre('save', function(next) {
    // Prevent modification of system roles
    if (this.isModified() && this.isSystemRole && !this.isNew) {
        const modifiedPaths = this.modifiedPaths();
        const allowedModifications = ['permissions', 'updatedBy'];
        const unauthorizedChanges = modifiedPaths.filter(path => !allowedModifications.includes(path));
        
        if (unauthorizedChanges.length > 0) {
            return next(new Error('System roles cannot be modified except for permissions'));
        }
    }
    next();
});

// Pre-remove middleware
roleSchema.pre('remove', function(next) {
    if (this.isSystemRole) {
        return next(new Error('System roles cannot be deleted'));
    }
    next();
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
