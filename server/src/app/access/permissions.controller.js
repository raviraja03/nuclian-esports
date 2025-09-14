const PermissionService = require('./permissions.service');

/**
 * Create a new permission
 * @route POST /api/access/permissions
 */
exports.createPermission = async (req, res) => {
    try {
        const permission = await PermissionService.createPermission(req.body, req.user.id);
        
        res.status(201).json({
            success: true,
            message: 'Permission created successfully',
            data: permission
        });
    } catch (error) {
        let status = 500;
        if (error.message.includes('already exists')) {
            status = 409;
        } else if (error.message.includes('validation')) {
            status = 400;
        }
        
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Get all permissions with pagination
 * @route GET /api/access/permissions
 */
exports.getAllPermissions = async (req, res) => {
    try {
        const { search } = req.query;
        
        if (search) {
            const result = await PermissionService.searchPermissions(search, req.pagination);
            return res.json({
                success: true,
                message: 'Permissions retrieved successfully',
                data: result
            });
        }

        const result = await PermissionService.getAllPermissions({}, req.pagination);
        
        res.json({
            success: true,
            message: 'Permissions retrieved successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Get permission by ID
 * @route GET /api/access/permissions/:permissionId
 */
exports.getPermissionById = async (req, res) => {
    try {
        const permission = await PermissionService.getPermissionById(req.params.permissionId);
        
        res.json({
            success: true,
            message: 'Permission retrieved successfully',
            data: permission
        });
    } catch (error) {
        const status = error.message === 'Permission not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Get permission by key
 * @route GET /api/access/permissions/key/:key
 */
exports.getPermissionByKey = async (req, res) => {
    try {
        const permission = await PermissionService.getPermissionByKey(req.params.key);
        
        res.json({
            success: true,
            message: 'Permission retrieved successfully',
            data: permission
        });
    } catch (error) {
        const status = error.message === 'Permission not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Update permission
 * @route PUT /api/access/permissions/:permissionId
 */
exports.updatePermission = async (req, res) => {
    try {
        const permission = await PermissionService.updatePermission(
            req.params.permissionId,
            req.body,
            req.user.id
        );
        
        res.json({
            success: true,
            message: 'Permission updated successfully',
            data: permission
        });
    } catch (error) {
        let status = 500;
        if (error.message === 'Permission not found') {
            status = 404;
        } else if (error.message.includes('already exists')) {
            status = 409;
        } else if (error.message.includes('validation')) {
            status = 400;
        }
        
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Delete permission
 * @route DELETE /api/access/permissions/:permissionId
 */
exports.deletePermission = async (req, res) => {
    try {
        await PermissionService.deletePermission(req.params.permissionId, req.user.id);
        
        res.json({
            success: true,
            message: 'Permission deleted successfully',
            data: null
        });
    } catch (error) {
        let status = 500;
        if (error.message === 'Permission not found') {
            status = 404;
        } else if (error.message.includes('Cannot delete')) {
            status = 403;
        }
        
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Get roles that have a specific permission
 * @route GET /api/access/permissions/:permissionId/roles
 */
exports.getPermissionRoles = async (req, res) => {
    try {
        const roles = await PermissionService.getPermissionRoles(req.params.permissionId);
        
        res.json({
            success: true,
            message: 'Permission roles retrieved successfully',
            data: roles
        });
    } catch (error) {
        const status = error.message === 'Permission not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Check if permission key exists
 * @route GET /api/access/permissions/check-key/:key
 */
exports.checkPermissionKey = async (req, res) => {
    try {
        const exists = await PermissionService.checkPermissionKeyExists(req.params.key);
        
        res.json({
            success: true,
            message: 'Permission key check completed',
            data: { exists }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Get permissions by keys
 * @route POST /api/access/permissions/by-keys
 */
exports.getPermissionsByKeys = async (req, res) => {
    try {
        const { keys } = req.body;
        
        if (!keys || !Array.isArray(keys)) {
            return res.status(400).json({
                success: false,
                message: 'Keys must be provided as an array'
            });
        }
        
        const permissions = await PermissionService.getPermissionsByKeys(keys);
        
        res.json({
            success: true,
            message: 'Permissions retrieved successfully',
            data: permissions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Bulk create permissions
 * @route POST /api/access/permissions/bulk
 */
exports.bulkCreatePermissions = async (req, res) => {
    try {
        const { permissions } = req.body;
        
        if (!permissions || !Array.isArray(permissions)) {
            return res.status(400).json({
                success: false,
                message: 'Permissions must be provided as an array'
            });
        }
        
        if (permissions.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'At least one permission is required'
            });
        }
        
        const result = await PermissionService.bulkCreatePermissions(permissions, req.user.id);
        
        res.status(201).json({
            success: true,
            message: `${result.length} permissions created successfully`,
            data: result
        });
    } catch (error) {
        let status = 500;
        if (error.message.includes('already exist')) {
            status = 409;
        } else if (error.message.includes('validation')) {
            status = 400;
        }
        
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};
