const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Role = require('../models/role.model');
const Permission = require('../models/permission.model');

/**
 * Authenticate user with JWT token
 */
const isAuthenticated = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

/**
 * Check if user has admin role
 */
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin role required'
        });
    }
    next();
};

/**
 * Check if user has super admin role
 */
const isSuperAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'superadmin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Super admin role required'
        });
    }
    next();
};

/**
 * Validate MongoDB ObjectId for role
 */
const validateRoleId = (req, res, next) => {
    const { roleId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid role ID format'
        });
    }
    
    next();
};

/**
 * Validate MongoDB ObjectId for permission
 */
const validatePermissionId = (req, res, next) => {
    const { permissionId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(permissionId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid permission ID format'
        });
    }
    
    next();
};

/**
 * Validate MongoDB ObjectId for user
 */
const validateUserId = (req, res, next) => {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user ID format'
        });
    }
    
    next();
};

/**
 * Check if role exists and is active
 */
const checkRoleExists = async (req, res, next) => {
    try {
        const { roleId } = req.params;
        const role = await Role.findById(roleId);
        
        if (!role || !role.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Role not found or inactive'
            });
        }
        
        req.role = role;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking role existence',
            error: error.message
        });
    }
};

/**
 * Check if permission exists and is active
 */
const checkPermissionExists = async (req, res, next) => {
    try {
        const { permissionId } = req.params;
        const permission = await Permission.findById(permissionId);
        
        if (!permission || !permission.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Permission not found or inactive'
            });
        }
        
        req.permission = permission;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking permission existence',
            error: error.message
        });
    }
};

/**
 * Prevent modification of system roles
 */
const preventSystemRoleModification = (req, res, next) => {
    if (req.role && req.role.isSystemRole) {
        // Allow only permission assignments for system roles
        if (req.method !== 'POST' || !req.route.path.includes('permissions')) {
            return res.status(403).json({
                success: false,
                message: 'System roles cannot be modified or deleted'
            });
        }
    }
    next();
};

/**
 * Validate role creation/update payload
 */
const validateRolePayload = (req, res, next) => {
    const { name, description } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: 'Role name is required and must be at least 2 characters'
        });
    }
    
    if (!description || typeof description !== 'string' || description.trim().length < 5) {
        return res.status(400).json({
            success: false,
            message: 'Role description is required and must be at least 5 characters'
        });
    }
    
    // Clean the data
    req.body.name = name.trim();
    req.body.description = description.trim();
    
    next();
};

/**
 * Validate permission creation/update payload
 */
const validatePermissionPayload = (req, res, next) => {
    const { name, description, key } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: 'Permission name is required and must be at least 2 characters'
        });
    }
    
    if (!description || typeof description !== 'string' || description.trim().length < 5) {
        return res.status(400).json({
            success: false,
            message: 'Permission description is required and must be at least 5 characters'
        });
    }
    
    if (key && (typeof key !== 'string' || !/^[a-z_]+$/.test(key))) {
        return res.status(400).json({
            success: false,
            message: 'Permission key can only contain lowercase letters and underscores'
        });
    }
    
    // Clean the data
    req.body.name = name.trim();
    req.body.description = description.trim();
    if (key) req.body.key = key.trim().toLowerCase();
    
    next();
};

/**
 * Validate pagination parameters
 */
const validatePagination = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    if (page < 1) {
        return res.status(400).json({
            success: false,
            message: 'Page must be greater than 0'
        });
    }
    
    if (limit < 1 || limit > 100) {
        return res.status(400).json({
            success: false,
            message: 'Limit must be between 1 and 100'
        });
    }
    
    req.pagination = { page, limit };
    next();
};

/**
 * Validate permission assignment payload
 */
const validatePermissionAssignment = (req, res, next) => {
    const { permissionIds } = req.body;
    
    if (!permissionIds || !Array.isArray(permissionIds)) {
        return res.status(400).json({
            success: false,
            message: 'Permission IDs must be provided as an array'
        });
    }
    
    if (permissionIds.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'At least one permission ID is required'
        });
    }
    
    // Validate each permission ID
    for (const id of permissionIds) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `Invalid permission ID format: ${id}`
            });
        }
    }
    
    next();
};

/**
 * Validate role assignment payload
 */
const validateRoleAssignment = (req, res, next) => {
    const { roleIds } = req.body;
    
    if (!roleIds || !Array.isArray(roleIds)) {
        return res.status(400).json({
            success: false,
            message: 'Role IDs must be provided as an array'
        });
    }
    
    if (roleIds.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'At least one role ID is required'
        });
    }
    
    // Validate each role ID
    for (const id of roleIds) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `Invalid role ID format: ${id}`
            });
        }
    }
    
    next();
};

module.exports = {
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    validateRoleId,
    validatePermissionId,
    validateUserId,
    checkRoleExists,
    checkPermissionExists,
    preventSystemRoleModification,
    validateRolePayload,
    validatePermissionPayload,
    validatePagination,
    validatePermissionAssignment,
    validateRoleAssignment
};
