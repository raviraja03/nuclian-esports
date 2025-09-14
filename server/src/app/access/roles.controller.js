const RoleService = require('./roles.service');

/**
 * Create a new role
 * @route POST /api/access/roles
 */
exports.createRole = async (req, res) => {
    try {
        const role = await RoleService.createRole(req.body, req.user.id);
        
        res.status(201).json({
            success: true,
            message: 'Role created successfully',
            data: role
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
 * Get all roles with pagination
 * @route GET /api/access/roles
 */
exports.getAllRoles = async (req, res) => {
    try {
        const { search } = req.query;
        const filters = search ? {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        } : {};

        const result = await RoleService.getAllRoles(filters, req.pagination);
        
        res.json({
            success: true,
            message: 'Roles retrieved successfully',
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
 * Get role by ID
 * @route GET /api/access/roles/:roleId
 */
exports.getRoleById = async (req, res) => {
    try {
        const role = await RoleService.getRoleById(req.params.roleId);
        
        res.json({
            success: true,
            message: 'Role retrieved successfully',
            data: role
        });
    } catch (error) {
        const status = error.message === 'Role not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Update role
 * @route PUT /api/access/roles/:roleId
 */
exports.updateRole = async (req, res) => {
    try {
        const role = await RoleService.updateRole(
            req.params.roleId,
            req.body,
            req.user.id
        );
        
        res.json({
            success: true,
            message: 'Role updated successfully',
            data: role
        });
    } catch (error) {
        let status = 500;
        if (error.message === 'Role not found') {
            status = 404;
        } else if (error.message.includes('System roles')) {
            status = 403;
        } else if (error.message.includes('already exists')) {
            status = 409;
        }
        
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Delete role
 * @route DELETE /api/access/roles/:roleId
 */
exports.deleteRole = async (req, res) => {
    try {
        await RoleService.deleteRole(req.params.roleId, req.user.id);
        
        res.json({
            success: true,
            message: 'Role deleted successfully',
            data: null
        });
    } catch (error) {
        let status = 500;
        if (error.message === 'Role not found') {
            status = 404;
        } else if (error.message.includes('System roles') || error.message.includes('Cannot delete')) {
            status = 403;
        }
        
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Assign permissions to role
 * @route POST /api/access/roles/:roleId/permissions
 */
exports.assignPermissions = async (req, res) => {
    try {
        const role = await RoleService.assignPermissions(
            req.params.roleId,
            req.body.permissionIds,
            req.user.id
        );
        
        res.status(201).json({
            success: true,
            message: 'Permissions assigned successfully',
            data: role
        });
    } catch (error) {
        let status = 500;
        if (error.message === 'Role not found' || error.message.includes('permissions not found')) {
            status = 404;
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
 * Get permissions for a role
 * @route GET /api/access/roles/:roleId/permissions
 */
exports.getRolePermissions = async (req, res) => {
    try {
        const permissions = await RoleService.getRolePermissions(req.params.roleId);
        
        res.json({
            success: true,
            message: 'Role permissions retrieved successfully',
            data: permissions
        });
    } catch (error) {
        const status = error.message === 'Role not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Remove permission from role
 * @route DELETE /api/access/roles/:roleId/permissions/:permissionId
 */
exports.removePermission = async (req, res) => {
    try {
        const role = await RoleService.removePermission(
            req.params.roleId,
            req.params.permissionId,
            req.user.id
        );
        
        res.json({
            success: true,
            message: 'Permission removed successfully',
            data: role
        });
    } catch (error) {
        let status = 500;
        if (error.message === 'Role not found') {
            status = 404;
        } else if (error.message.includes('not assigned')) {
            status = 400;
        }
        
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Get system roles
 * @route GET /api/access/roles/system
 */
exports.getSystemRoles = async (req, res) => {
    try {
        const roles = await RoleService.getSystemRoles();
        
        res.json({
            success: true,
            message: 'System roles retrieved successfully',
            data: roles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
