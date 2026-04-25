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

// ===============================================================
// ====================USER ENTITY PERMISSIONS====================
export const USER_CREATE = 'user:create';
export const USER_READ = 'user:read';
export const USER_LIST = 'user:list';
export const USER_UPDATE = 'user:update';
export const USER_DELETE = 'user:delete';
export const USER_MANAGE = 'user:manage';

export const USER_PERMISSIONS = [
    { name: USER_CREATE, description: 'Create user' },
    { name: USER_READ, description: 'Read user' },
    { name: USER_LIST, description: 'List users' },
    { name: USER_UPDATE, description: 'Update user' },
    { name: USER_DELETE, description: 'Delete user' },
    { name: USER_MANAGE, description: 'Manage user' }, //aggregate permission for admin which  includes sensitive fileds like status
];
