const USER_ROLES = {
    LANDLORD: 'landlord',
    TENANT: 'tenant',
    ADMIN: 'admin',
};

const USER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
};

const AUTH_TOKENS = {
    XAT: 'xat',
};
export { USER_ROLES, USER_STATUS, AUTH_TOKENS };

// ========================================================
// ====================USER ENTITY PERMISSIONS====================
export const USER_PERMISSIONS = [
    { name: 'user:create', description: 'Create user' },
    { name: 'user:read', description: 'Read user' },
    { name: 'user:list', description: 'List users' },
    { name: 'user:update', description: 'Update user' },
    { name: 'user:delete', description: 'Delete user' },

    { name: 'user:manage', description: 'Manage user' }, //aggregate permission for admin whihc includes sensitive fileds like status
];
