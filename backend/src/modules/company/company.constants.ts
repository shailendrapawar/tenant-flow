// Company Constants

export const COMPANY_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
};

// ===============================================================
// =================COMPANY ENTITY PERMISSIONS====================
export const COMPANY_PERMISSIONS = [
    { name: 'company:create', description: 'Create company' },
    { name: 'company:read', description: 'Read company' },
    { name: 'company:list', description: 'List companies' },
    { name: 'company:update', description: 'Update company' },
    { name: 'company:delete', description: 'Delete company' },

    { name: 'company:manage', description: 'Manage company' }, //aggregate permission for admin whihc includes sensitive fileds like status
];
