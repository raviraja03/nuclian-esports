const Role = require('../../models/role.model');
const Permission = require('../../models/permission.model');
const mongoose = require('mongoose');

class AssignmentService {
    /**
     * Assign roles to user
     */
    static async assignRolesToUser(userId, roleIds, assignedBy) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Get User model (assuming it exists)
            const User = require('../../models/user.model');
            
            const user = await User.findById(userId).session(session);
            if (!user) {
                throw new Error('User not found');
            }

            // Verify all roles exist and are active
            const roles = await Role.find({
                _id: { $in: roleIds },
                isActive: true
            }).session(session);

            if (roles.length !== roleIds.length) {
                throw new Error('One or more roles not found or inactive');
            }

            // Add new roles (avoid duplicates)
            const existingRoleIds = (user.roles || []).map(r => r.toString());
            const newRoleIds = roleIds.filter(id => !existingRoleIds.includes(id.toString()));
            
            if (newRoleIds.length === 0) {
                throw new Error('All roles are already assigned to this user');
            }

            // Update user with new roles
            if (!user.roles) user.roles = [];
            user.roles.push(...newRoleIds);
            user.updatedBy = assignedBy;
            await user.save({ session });

            await session.commitTransaction();
            return user.populate('roles', 'name description');
        } catch (error) {
            await session.abortTransaction();
            throw error.message.includes('not found') || error.message.includes('already assigned')
                ? error
                : new Error(`Error assigning roles to user: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Get user roles
     */
    static async getUserRoles(userId) {
        try {
            const User = require('../../models/user.model');
            
            const user = await User.findById(userId)
                .populate({
                    path: 'roles',
                    match: { isActive: true },
                    select: 'name description permissions',
                    populate: {
                        path: 'permissions',
                        match: { isActive: true },
                        select: 'name description key'
                    }
                });

            if (!user) {
                throw new Error('User not found');
            }

            return user.roles || [];
        } catch (error) {
            throw error.message === 'User not found'
                ? error
                : new Error(`Error fetching user roles: ${error.message}`);
        }
    }

    /**
     * Remove role from user
     */
    static async removeRoleFromUser(userId, roleId, removedBy) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const User = require('../../models/user.model');
            
            const user = await User.findById(userId).session(session);
            if (!user) {
                throw new Error('User not found');
            }

            if (!user.roles || !user.roles.includes(roleId)) {
                throw new Error('Role not assigned to this user');
            }

            // Remove role from user
            user.roles = user.roles.filter(r => !r.equals(roleId));
            user.updatedBy = removedBy;
            await user.save({ session });

            await session.commitTransaction();
            return user.populate('roles', 'name description');
        } catch (error) {
            await session.abortTransaction();
            throw error.message.includes('not found') || error.message.includes('not assigned')
                ? error
                : new Error(`Error removing role from user: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Get all users with a specific role
     */
    static async getUsersByRole(roleId, pagination = { page: 1, limit: 10 }) {
        try {
            const role = await Role.findById(roleId);
            if (!role || !role.isActive) {
                throw new Error('Role not found');
            }

            const User = require('../../models/user.model');
            const { page, limit } = pagination;
            const skip = (page - 1) * limit;

            const users = await User.find({ roles: roleId })
                .select('name email createdAt')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });

            const total = await User.countDocuments({ roles: roleId });

            return {
                users,
                role: {
                    id: role._id,
                    name: role.name,
                    description: role.description
                },
                pagination: {
                    current: page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw error.message === 'Role not found'
                ? error
                : new Error(`Error fetching users by role: ${error.message}`);
        }
    }

    /**
     * Check if user has specific permission
     */
    static async userHasPermission(userId, permissionKey) {
        try {
            const User = require('../../models/user.model');
            
            const user = await User.findById(userId)
                .populate({
                    path: 'roles',
                    match: { isActive: true },
                    populate: {
                        path: 'permissions',
                        match: { isActive: true, key: permissionKey }
                    }
                });

            if (!user) {
                throw new Error('User not found');
            }

            // Check if any of the user's roles has the permission
            for (const role of user.roles || []) {
                if (role.permissions && role.permissions.length > 0) {
                    return true;
                }
            }

            return false;
        } catch (error) {
            throw error.message === 'User not found'
                ? error
                : new Error(`Error checking user permission: ${error.message}`);
        }
    }

    /**
     * Get all permissions for a user (through roles)
     */
    static async getUserPermissions(userId) {
        try {
            const User = require('../../models/user.model');
            
            const user = await User.findById(userId)
                .populate({
                    path: 'roles',
                    match: { isActive: true },
                    populate: {
                        path: 'permissions',
                        match: { isActive: true },
                        select: 'name description key'
                    }
                });

            if (!user) {
                throw new Error('User not found');
            }

            // Collect all unique permissions from all roles
            const permissionsMap = new Map();
            
            for (const role of user.roles || []) {
                for (const permission of role.permissions || []) {
                    permissionsMap.set(permission.key, permission);
                }
            }

            return Array.from(permissionsMap.values());
        } catch (error) {
            throw error.message === 'User not found'
                ? error
                : new Error(`Error fetching user permissions: ${error.message}`);
        }
    }

    /**
     * Bulk assign roles to multiple users
     */
    static async bulkAssignRoles(userIds, roleIds, assignedBy) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const User = require('../../models/user.model');
            
            // Verify all users exist
            const users = await User.find({ _id: { $in: userIds } }).session(session);
            if (users.length !== userIds.length) {
                throw new Error('One or more users not found');
            }

            // Verify all roles exist and are active
            const roles = await Role.find({
                _id: { $in: roleIds },
                isActive: true
            }).session(session);

            if (roles.length !== roleIds.length) {
                throw new Error('One or more roles not found or inactive');
            }

            // Update all users
            const updateResults = [];
            for (const user of users) {
                const existingRoleIds = (user.roles || []).map(r => r.toString());
                const newRoleIds = roleIds.filter(id => !existingRoleIds.includes(id.toString()));
                
                if (newRoleIds.length > 0) {
                    if (!user.roles) user.roles = [];
                    user.roles.push(...newRoleIds);
                    user.updatedBy = assignedBy;
                    await user.save({ session });
                    updateResults.push(user);
                }
            }

            await session.commitTransaction();
            return updateResults;
        } catch (error) {
            await session.abortTransaction();
            throw error.message.includes('not found')
                ? error
                : new Error(`Error bulk assigning roles: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Get role assignment statistics
     */
    static async getRoleAssignmentStats() {
        try {
            const User = require('../../models/user.model');
            
            const stats = await Role.aggregate([
                { $match: { isActive: true } },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: 'roles',
                        as: 'users'
                    }
                },
                {
                    $project: {
                        name: 1,
                        description: 1,
                        userCount: { $size: '$users' },
                        permissionCount: { $size: '$permissions' }
                    }
                },
                { $sort: { userCount: -1 } }
            ]);

            return stats;
        } catch (error) {
            throw new Error(`Error fetching role assignment statistics: ${error.message}`);
        }
    }
}

module.exports = AssignmentService;
