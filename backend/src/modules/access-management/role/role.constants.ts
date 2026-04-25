// Role Constants

// =========================================
//=========ROLE ENTITY DATA=================

export const SYSTEM_ROLES = [
    {
        name: 'admin',
        permissions: ['user:manage', 'company:manage'],
        description: 'System administrator with full access',
        isSystem: true,
    },
    {
        name: 'landlord',
        permissions: ['company:create', 'company:read', 'company:update'],
        description: 'Property landlord with limited access',
        isSystem: true,
    },
];
