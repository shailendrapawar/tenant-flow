// Tenant Constants

export const TENANT_STATUS = {
    LIVING: 'living',
    LEFT: 'left',
} as const;

// ===============================================================
// =================TENANT ENTITY PERMISSIONS====================

export const TENANT_CREATE = 'tenant:create';
export const TENANT_READ = 'tenant:read';
export const TENANT_LIST = 'tenant:list';
export const TENANT_UPDATE = 'tenant:update';
export const TENANT_DELETE = 'tenant:delete';
export const TENANT_MANAGE = 'tenant:manage';

export const TENANT_PERMISSIONS = [
    { name: TENANT_CREATE, description: 'Create tenant' },
    { name: TENANT_READ, description: 'Read tenant' },
    { name: TENANT_LIST, description: 'List tenants' },
    { name: TENANT_UPDATE, description: 'Update tenant' },
    { name: TENANT_DELETE, description: 'Delete tenant' },

    { name: TENANT_MANAGE, description: 'Manage tenant' }, //aggregate permission for admin which includes sensitive fileds like status
];
