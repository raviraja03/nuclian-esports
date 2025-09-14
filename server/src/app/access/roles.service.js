const Role = require('../../models/role.model');
const Permission = require('../../models/permission.model');
const mongoose = require('mongoose');

class RoleService {
    /**
     * Create a new role
     */
    static async createRole(roleData, userId) {
        try {
            const role = new Role({
                ...roleData,
                createdBy: userId
            });
            return await role.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new Error('Role with this name already exists');
            }
            throw new Error(`Error creating role: ${error.message}`);
        }
    }

    /**
     * Get all roles with pagination
     */
    static async getAllRoles(filters = {}, pagination = { page: 1, limit: 10 }) {
        try {
            const roles = await Role.findActiveRoles(filters, pagination);
            const total = await Role.getRoleCount(filters);

            return {
                roles,
                pagination: {
                    current: pagination.page,
                    limit: pagination.limit,
                    total,
                    pages: Math.ceil(total / pagination.limit)
                }
            };
        } catch (error) {
            throw new Error(`Error fetching roles: ${error.message}`);
        }
    }

    /**
     * Get role by ID
     */
    static async getRoleById(roleId) {
        try {
            const role = await Role.findById(roleId)
                .populate('permissions', 'name description key isActive')
                .populate('createdBy', 'name email')
                .populate('updatedBy', 'name email');

            if (!role || !role.isActive) {
                throw new Error('Role not found');
            }

            return role;
        } catch (error) {
            throw error.message === 'Role not found'
                ? error
                : new Error(`Error fetching role: ${error.message}`);
        }
    }

    /**
     * Update role
     */
    static async updateRole(roleId, updateData, userId) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const role = await Role.findById(roleId).session(session);
            if (!role || !role.isActive) {
                throw new Error('Role not found');
            }

            if (role.isSystemRole) {
                throw new Error('System roles cannot be updated');
            }

            Object.assign(role, updateData, { updatedBy: userId });
            await role.save({ session });

            await session.commitTransaction();
            return role;
        } catch (error) {
            await session.abortTransaction();
            if (error.code === 11000) {
                throw new Error('Role with this name already exists');
            }
            throw error.message.includes('not found') || error.message.includes('System roles')
                ? error
                : new Error(`Error updating role: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Delete role (soft delete)
     */
    static async deleteRole(roleId, userId) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const role = await Role.findById(roleId).session(session);
            if (!role || !role.isActive) {
                throw new Error('Role not found');
            }

            if (role.isSystemRole) {
                throw new Error('System roles cannot be deleted');
            }

            // Check if role is assigned to any users
            const User = require('../../models/user.model');
            const userCount = await User.countDocuments({ roles: roleId }).session(session);
            
            if (userCount > 0) {
                throw new Error('Cannot delete role that is assigned to users');
            }

            role.isActive = false;
            role.updatedBy = userId;
            await role.save({ session });

            await session.commitTransaction();
            return role;
        } catch (error) {
            await session.abortTransaction();
            throw error.message.includes('not found') || 
                   error.message.includes('System roles') || 
                   error.message.includes('Cannot delete')
                ? error
                : new Error(`Error deleting role: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Assign permissions to role
     */
    static async assignPermissions(roleId, permissionIds, userId) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const role = await Role.findById(roleId).session(session);
            if (!role || !role.isActive) {
                throw new Error('Role not found');
            }

            // Verify all permissions exist and are active
            const permissions = await Permission.find({
                _id: { $in: permissionIds },
                isActive: true
            }).session(session);

            if (permissions.length !== permissionIds.length) {
                throw new Error('One or more permissions not found or inactive');
            }

            // Add new permissions (avoid duplicates)
            const existingPermissionIds = role.permissions.map(p => p.toString());
            const newPermissionIds = permissionIds.filter(id => !existingPermissionIds.includes(id.toString()));
            
            role.permissions.push(...newPermissionIds);
            role.updatedBy = userId;
            await role.save({ session });

            await session.commitTransaction();
            return role.populate('permissions', 'name description key isActive');
        } catch (error) {
            await session.abortTransaction();
            throw error.message.includes('not found')
                ? error
                : new Error(`Error assigning permissions: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Get permissions for a role
     */
    static async getRolePermissions(roleId) {
        try {
            const role = await Role.findById(roleId)
                .populate({
                    path: 'permissions',
                    match: { isActive: true },
                    select: 'name description key'
                });

            if (!role || !role.isActive) {
                throw new Error('Role not found');
            }

            return role.permissions;
        } catch (error) {
            throw error.message === 'Role not found'
                ? error
                : new Error(`Error fetching role permissions: ${error.message}`);
        }
    }

    /**
     * Remove permission from role
     */
    static async removePermission(roleId, permissionId, userId) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const role = await Role.findById(roleId).session(session);
            if (!role || !role.isActive) {
                throw new Error('Role not found');
            }

            const permissionExists = role.permissions.some(p => p.equals(permissionId));
            if (!permissionExists) {
                throw new Error('Permission not assigned to this role');
            }

            await role.removePermission(permissionId);
            role.updatedBy = userId;
            await role.save({ session });

            await session.commitTransaction();
            return role.populate('permissions', 'name description key isActive');
        } catch (error) {
            await session.abortTransaction();
            throw error.message.includes('not found') || error.message.includes('not assigned')
                ? error
                : new Error(`Error removing permission: ${error.message}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Get system roles
     */
    static async getSystemRoles() {
        try {
            return await Role.getSystemRoles();
        } catch (error) {
            throw new Error(`Error fetching system roles: ${error.message}`);
        }
    }
}

module.exports = RoleService;
