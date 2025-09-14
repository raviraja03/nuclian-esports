const express = require('express');
const {
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    validateRoleId,
    validatePermissionId,
    checkRoleExists,
    preventSystemRoleModification,
    validateRolePayload,
    validatePagination,
    validatePermissionAssignment
} = require('../../middleware/access.middleware');

const {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
    assignPermissions,
    getRolePermissions,
    removePermission,
    getSystemRoles
} = require('./roles.controller');

const router = express.Router();

/**
 * @route   GET /api/access/roles/system
 * @desc    Get system roles
 * @access  Admin
 */
router.get('/system',
    isAuthenticated,
    isAdmin,
    getSystemRoles
);

/**
 * @route   POST /api/access/roles
 * @desc    Create a new role
 * @access  Admin
 */
router.post('/',
    isAuthenticated,
    isAdmin,
    validateRolePayload,
    createRole
);

/**
 * @route   GET /api/access/roles
 * @desc    Get all roles with pagination
 * @access  Admin
 */
router.get('/',
    isAuthenticated,
    isAdmin,
    validatePagination,
    getAllRoles
);

/**
 * @route   GET /api/access/roles/:roleId
 * @desc    Get role by ID
 * @access  Admin
 */
router.get('/:roleId',
    isAuthenticated,
    isAdmin,
    validateRoleId,
    getRoleById
);

/**
 * @route   PUT /api/access/roles/:roleId
 * @desc    Update role
 * @access  Admin
 */
router.put('/:roleId',
    isAuthenticated,
    isAdmin,
    validateRoleId,
    checkRoleExists,
    preventSystemRoleModification,
    validateRolePayload,
    updateRole
);

/**
 * @route   DELETE /api/access/roles/:roleId
 * @desc    Delete role
 * @access  Super Admin
 */
router.delete('/:roleId',
    isAuthenticated,
    isSuperAdmin,
    validateRoleId,
    checkRoleExists,
    preventSystemRoleModification,
    deleteRole
);

/**
 * @route   POST /api/access/roles/:roleId/permissions
 * @desc    Assign permissions to role
 * @access  Admin
 */
router.post('/:roleId/permissions',
    isAuthenticated,
    isAdmin,
    validateRoleId,
    checkRoleExists,
    validatePermissionAssignment,
    assignPermissions
);

/**
 * @route   GET /api/access/roles/:roleId/permissions
 * @desc    Get permissions for a role
 * @access  Admin
 */
router.get('/:roleId/permissions',
    isAuthenticated,
    isAdmin,
    validateRoleId,
    getRolePermissions
);

/**
 * @route   DELETE /api/access/roles/:roleId/permissions/:permissionId
 * @desc    Remove permission from role
 * @access  Admin
 */
router.delete('/:roleId/permissions/:permissionId',
    isAuthenticated,
    isAdmin,
    validateRoleId,
    validatePermissionId,
    checkRoleExists,
    removePermission
);

module.exports = router;
