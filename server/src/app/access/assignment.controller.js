const AssignmentService = require('./assignment.service');

/**
 * Assign roles to user
 * @route POST /api/access/users/:userId/roles
 */
exports.assignRolesToUser = async (req, res) => {
    try {
        const user = await AssignmentService.assignRolesToUser(
            req.params.userId,
            req.body.roleIds,
            req.user.id
        );
        
        res.status(201).json({
            success: true,
            message: 'Roles assigned to user successfully',
            data: user
        });
    } catch (error) {
        let status = 500;
        if (error.message === 'User not found' || error.message.includes('roles not found')) {
            status = 404;
        } else if (error.message.includes('already assigned')) {
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
 * Get user roles
 * @route GET /api/access/users/:userId/roles
 */
exports.getUserRoles = async (req, res) => {
    try {
        const roles = await AssignmentService.getUserRoles(req.params.userId);
        
        res.json({
            success: true,
            message: 'User roles retrieved successfully',
            data: roles
        });
    } catch (error) {
        const status = error.message === 'User not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Remove role from user
 * @route DELETE /api/access/users/:userId/roles/:roleId
 */
exports.removeRoleFromUser = async (req, res) => {
    try {
        const user = await AssignmentService.removeRoleFromUser(
            req.params.userId,
            req.params.roleId,
            req.user.id
        );
        
        res.json({
            success: true,
            message: 'Role removed from user successfully',
            data: user
        });
    } catch (error) {
        let status = 500;
        if (error.message === 'User not found') {
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
 * Get all users with a specific role
 * @route GET /api/access/roles/:roleId/users
 */
exports.getUsersByRole = async (req, res) => {
    try {
        const result = await AssignmentService.getUsersByRole(
            req.params.roleId,
            req.pagination
        );
        
        res.json({
            success: true,
            message: 'Users with role retrieved successfully',
            data: result
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
 * Check if user has specific permission
 * @route GET /api/access/users/:userId/permissions/:permissionKey/check
 */
exports.checkUserPermission = async (req, res) => {
    try {
        const hasPermission = await AssignmentService.userHasPermission(
            req.params.userId,
            req.params.permissionKey
        );
        
        res.json({
            success: true,
            message: 'Permission check completed',
            data: { hasPermission }
        });
    } catch (error) {
        const status = error.message === 'User not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Get all permissions for a user (through roles)
 * @route GET /api/access/users/:userId/permissions
 */
exports.getUserPermissions = async (req, res) => {
    try {
        const permissions = await AssignmentService.getUserPermissions(req.params.userId);
        
        res.json({
            success: true,
            message: 'User permissions retrieved successfully',
            data: permissions
        });
    } catch (error) {
        const status = error.message === 'User not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Bulk assign roles to multiple users
 * @route POST /api/access/users/bulk/roles
 */
exports.bulkAssignRoles = async (req, res) => {
    try {
        const { userIds, roleIds } = req.body;
        
        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'User IDs must be provided as a non-empty array'
            });
        }
        
        if (!roleIds || !Array.isArray(roleIds) || roleIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Role IDs must be provided as a non-empty array'
            });
        }
        
        const result = await AssignmentService.bulkAssignRoles(
            userIds,
            roleIds,
            req.user.id
        );
        
        res.status(201).json({
            success: true,
            message: `Roles assigned to ${result.length} users successfully`,
            data: result
        });
    } catch (error) {
        let status = 500;
        if (error.message.includes('not found')) {
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
 * Get role assignment statistics
 * @route GET /api/access/stats/role-assignments
 */
exports.getRoleAssignmentStats = async (req, res) => {
    try {
        const stats = await AssignmentService.getRoleAssignmentStats();
        
        res.json({
            success: true,
            message: 'Role assignment statistics retrieved successfully',
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Get current user's roles and permissions
 * @route GET /api/access/me/roles
 */
exports.getMyRoles = async (req, res) => {
    try {
        const roles = await AssignmentService.getUserRoles(req.user.id);
        
        res.json({
            success: true,
            message: 'Your roles retrieved successfully',
            data: roles
        });
    } catch (error) {
        const status = error.message === 'User not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * Get current user's permissions
 * @route GET /api/access/me/permissions
 */
exports.getMyPermissions = async (req, res) => {
    try {
        const permissions = await AssignmentService.getUserPermissions(req.user.id);
        
        res.json({
            success: true,
            message: 'Your permissions retrieved successfully',
            data: permissions
        });
    } catch (error) {
        const status = error.message === 'User not found' ? 404 : 500;
        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};
