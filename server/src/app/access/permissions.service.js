const Permission = require('../../models/permission.model');
const Role = require('../../models/role.model');
const mongoose = require('mongoose');

class PermissionService {
    /**
     * Create a new permission
     */
    static async createPermission(permissionData, userId) {
        try {
            const permission = new Permission({
                ...permissionData,
                createdBy: userId
            });
            return await permission.save();
        } catch (error) {
            if (error.code === 11000) {
                if (error.keyPattern?.name) {
                    throw new Error('Permission with this name already exists');
                }
                if (error.keyPattern?.key) {
                    throw new Error('Permission with this key already exists');
                }
                throw new Error('Permission already exists');
            }
            throw new Error(`Error creating permission: ${error.message}`);
        }
    }

    /**
     * Get all permissions with pagination
     */
    static async getAllPermissions(filters = {}, pagination = { page: 1, limit: 10 }) {
        try {
            const permissions = await Permission.findActivePermissions(filters, pagination);
            const total = await Permission.getPermissionCount(filters);

            return {
                permissions,
                pagination: {
                    current: pagination.page,
                    limit: pagination.limit,
                    total,
                    pages: Math.ceil(total / pagination.limit)
                }
            };
        } catch (error) {
            throw new Error(`Error fetching permissions: ${error.message}`);
        }
    }

    /**
     * Get permission by ID
     */
    static async getPermissionById(permissionId) {
        try {
            const permission = await Permission.findById(permissionId)
                .populate('createdBy', 'name email')
                .populate('updatedBy', 'name email');

            if (!permission || !permission.isActive) {
                throw new Error('Permission not found');
            }

            return permission;
        } catch (error) {
            throw error.message === 'Permission not found'
                ? error
                : new Error(`Error fetching permission: ${error.message}`);
        }
    }

    /**
     * Get permission by key
     */
    static async getPermissionByKey(key) {
        try {
            const permission = await Permission.findByKey(key);
            if (!permission) {
                throw new Error('Permission not found');
            }
            return permission;
        } catch (error) {
            throw error.message === 'Permission not found'
                ? error
                : new Error(`Error fetching permission: ${error.message}`);
        }
    }

    /**
     * Update permission
     */
    static async updatePermission(permissionId, updateData, userId) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const permission = await Permission.findById(permissionId).session(session);
            if (!permission || !permission.isActive) {
                throw new Error('Permission not found');
            }

            Object.assign(permission, updateData, { updatedBy: userId });
            await permission.save({ session });

            await session.commitTransaction();
            return permission;
        } catch (error) {
            await session.abortTransaction();
            if (error.code === 11000) {
                if (error.keyPattern?.name) {
                    throw new Error('Permission with this name already exists');
                }
                if (error.keyPattern?.key) {
                    throw new Error('Permission with this key already exists');
                }
                throw new Error('Permission already exists');
            }
            throw error.message === 'Permission not found'
                ? error
                : new Error(`Error updating permission: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Delete permission (soft delete)
     */
    static async deletePermission(permissionId, userId) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const permission = await Permission.findById(permissionId).session(session);
            if (!permission || !permission.isActive) {
                throw new Error('Permission not found');
            }

            // Check if permission is assigned to any roles
            const roleCount = await Role.countDocuments({
                permissions: permissionId,
                isActive: true
            }).session(session);

            if (roleCount > 0) {
                throw new Error('Cannot delete permission that is assigned to roles');
            }

            permission.isActive = false;
            permission.updatedBy = userId;
            await permission.save({ session });

            await session.commitTransaction();
            return permission;
        } catch (error) {
            await session.abortTransaction();
            throw error.message.includes('not found') || error.message.includes('Cannot delete')
                ? error
                : new Error(`Error deleting permission: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Get roles that have a specific permission
     */
    static async getPermissionRoles(permissionId) {
        try {
            const permission = await Permission.findById(permissionId);
            if (!permission || !permission.isActive) {
                throw new Error('Permission not found');
            }

            const roles = await Role.find({
                permissions: permissionId,
                isActive: true
            }).select('name description');

            return roles;
        } catch (error) {
            throw error.message === 'Permission not found'
                ? error
                : new Error(`Error fetching permission roles: ${error.message}`);
        }
    }

    /**
     * Check if a permission key exists
     */
    static async checkPermissionKeyExists(key, excludeId = null) {
        try {
            const query = { key, isActive: true };
            if (excludeId) {
                query._id = { $ne: excludeId };
            }

            const permission = await Permission.findOne(query);
            return !!permission;
        } catch (error) {
            throw new Error(`Error checking permission key: ${error.message}`);
        }
    }

    /**
     * Get permissions by keys
     */
    static async getPermissionsByKeys(keys) {
        try {
            const permissions = await Permission.find({
                key: { $in: keys },
                isActive: true
            }).select('name description key');

            return permissions;
        } catch (error) {
            throw new Error(`Error fetching permissions by keys: ${error.message}`);
        }
    }

    /**
     * Search permissions
     */
    static async searchPermissions(searchTerm, pagination = { page: 1, limit: 10 }) {
        try {
            const searchRegex = new RegExp(searchTerm, 'i');
            const filters = {
                $or: [
                    { name: searchRegex },
                    { description: searchRegex },
                    { key: searchRegex }
                ]
            };

            const permissions = await Permission.findActivePermissions(filters, pagination);
            const total = await Permission.getPermissionCount(filters);

            return {
                permissions,
                pagination: {
                    current: pagination.page,
                    limit: pagination.limit,
                    total,
                    pages: Math.ceil(total / pagination.limit)
                }
            };
        } catch (error) {
            throw new Error(`Error searching permissions: ${error.message}`);
        }
    }

    /**
     * Bulk create permissions
     */
    static async bulkCreatePermissions(permissionsData, userId) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const permissions = permissionsData.map(data => ({
                ...data,
                createdBy: userId
            }));

            const result = await Permission.insertMany(permissions, { session });

            await session.commitTransaction();
            return result;
        } catch (error) {
            await session.abortTransaction();
            if (error.code === 11000) {
                throw new Error('One or more permissions already exist');
            }
            throw new Error(`Error creating permissions: ${error.message}`);
        } finally {
            session.endSession();
        }
    }
}

module.exports = PermissionService;
