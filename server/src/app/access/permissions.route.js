const express = require('express');
const {
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    validatePermissionId,
    checkPermissionExists,
    validatePermissionPayload,
    validatePagination
} = require('../../middleware/access.middleware');

const {
    createPermission,
    getAllPermissions,
    getPermissionById,
    getPermissionByKey,
    updatePermission,
    deletePermission,
    getPermissionRoles,
    checkPermissionKey,
    getPermissionsByKeys,
    bulkCreatePermissions
} = require('./permissions.controller');

const router = express.Router();

/**
 * @route   POST /api/access/permissions/bulk
 * @desc    Bulk create permissions
 * @access  Super Admin
 */
router.post('/bulk',
    isAuthenticated,
    isSuperAdmin,
    bulkCreatePermissions
);

/**
 * @route   POST /api/access/permissions/by-keys
 * @desc    Get permissions by keys
 * @access  Admin
 */
router.post('/by-keys',
    isAuthenticated,
    isAdmin,
    getPermissionsByKeys
);

/**
 * @route   GET /api/access/permissions/check-key/:key
 * @desc    Check if permission key exists
 * @access  Admin
 */
router.get('/check-key/:key',
    isAuthenticated,
    isAdmin,
    checkPermissionKey
);

/**
 * @route   GET /api/access/permissions/key/:key
 * @desc    Get permission by key
 * @access  Admin
 */
router.get('/key/:key',
    isAuthenticated,
    isAdmin,
    getPermissionByKey
);

/**
 * @route   POST /api/access/permissions
 * @desc    Create a new permission
 * @access  Admin
 */
router.post('/',
    isAuthenticated,
    isAdmin,
    validatePermissionPayload,
    createPermission
);

/**
 * @route   GET /api/access/permissions
 * @desc    Get all permissions with pagination
 * @access  Admin
 */
router.get('/',
    isAuthenticated,
    isAdmin,
    validatePagination,
    getAllPermissions
);

/**
 * @route   GET /api/access/permissions/:permissionId
 * @desc    Get permission by ID
 * @access  Admin
 */
router.get('/:permissionId',
    isAuthenticated,
    isAdmin,
    validatePermissionId,
    getPermissionById
);

/**
 * @route   PUT /api/access/permissions/:permissionId
 * @desc    Update permission
 * @access  Admin
 */
router.put('/:permissionId',
    isAuthenticated,
    isAdmin,
    validatePermissionId,
    checkPermissionExists,
    validatePermissionPayload,
    updatePermission
);

/**
 * @route   DELETE /api/access/permissions/:permissionId
 * @desc    Delete permission
 * @access  Super Admin
 */
router.delete('/:permissionId',
    isAuthenticated,
    isSuperAdmin,
    validatePermissionId,
    checkPermissionExists,
    deletePermission
);

/**
 * @route   GET /api/access/permissions/:permissionId/roles
 * @desc    Get roles that have a specific permission
 * @access  Admin
 */
router.get('/:permissionId/roles',
    isAuthenticated,
    isAdmin,
    validatePermissionId,
    getPermissionRoles
);

module.exports = router;
