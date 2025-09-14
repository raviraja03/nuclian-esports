const express = require('express');
const {
    isAuthenticated,
    isAdmin,
    validateRoleId,
    validateUserId,
    validatePagination,
    validateRoleAssignment
} = require('../../middleware/access.middleware');

const {
    assignRolesToUser,
    getUserRoles,
    removeRoleFromUser,
    getUsersByRole,
    checkUserPermission,
    getUserPermissions,
    bulkAssignRoles,
    getRoleAssignmentStats,
    getMyRoles,
    getMyPermissions
} = require('./assignment.controller');

const router = express.Router();

/**
 * @route   GET /api/access/me/roles
 * @desc    Get current user's roles
 * @access  Private
 */
router.get('/me/roles',
    isAuthenticated,
    getMyRoles
);

/**
 * @route   GET /api/access/me/permissions
 * @desc    Get current user's permissions
 * @access  Private
 */
router.get('/me/permissions',
    isAuthenticated,
    getMyPermissions
);

/**
 * @route   GET /api/access/stats/role-assignments
 * @desc    Get role assignment statistics
 * @access  Admin
 */
router.get('/stats/role-assignments',
    isAuthenticated,
    isAdmin,
    getRoleAssignmentStats
);

/**
 * @route   POST /api/access/users/bulk/roles
 * @desc    Bulk assign roles to multiple users
 * @access  Admin
 */
router.post('/users/bulk/roles',
    isAuthenticated,
    isAdmin,
    bulkAssignRoles
);

/**
 * @route   POST /api/access/users/:userId/roles
 * @desc    Assign roles to user
 * @access  Admin
 */
router.post('/users/:userId/roles',
    isAuthenticated,
    isAdmin,
    validateUserId,
    validateRoleAssignment,
    assignRolesToUser
);

/**
 * @route   GET /api/access/users/:userId/roles
 * @desc    Get user roles
 * @access  Admin
 */
router.get('/users/:userId/roles',
    isAuthenticated,
    isAdmin,
    validateUserId,
    getUserRoles
);

/**
 * @route   DELETE /api/access/users/:userId/roles/:roleId
 * @desc    Remove role from user
 * @access  Admin
 */
router.delete('/users/:userId/roles/:roleId',
    isAuthenticated,
    isAdmin,
    validateUserId,
    validateRoleId,
    removeRoleFromUser
);

/**
 * @route   GET /api/access/users/:userId/permissions
 * @desc    Get all permissions for a user (through roles)
 * @access  Admin
 */
router.get('/users/:userId/permissions',
    isAuthenticated,
    isAdmin,
    validateUserId,
    getUserPermissions
);

/**
 * @route   GET /api/access/users/:userId/permissions/:permissionKey/check
 * @desc    Check if user has specific permission
 * @access  Admin
 */
router.get('/users/:userId/permissions/:permissionKey/check',
    isAuthenticated,
    isAdmin,
    validateUserId,
    checkUserPermission
);

/**
 * @route   GET /api/access/roles/:roleId/users
 * @desc    Get all users with a specific role
 * @access  Admin
 */
router.get('/roles/:roleId/users',
    isAuthenticated,
    isAdmin,
    validateRoleId,
    validatePagination,
    getUsersByRole
);

module.exports = router;
