// Property Constants

// 1: model constants
export const PROPERTY_TYPES = {
    APARTMENT: 'apartment',
    HOUSE: 'house',
    HOSTEL: 'hostel',
    COMMERCIAL: 'commercial',
} as const;

export const PROPERTY_ACQUISITION_TYPES = {
    OWNED: 'owned',
    LEASED: 'leased',
} as const;

export const PROPERTY_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
} as const;

// =========================================
// ===========PERMISSIONS==================
export const PROPERTY_CREATE = 'property:create';
export const PROPERTY_READ = 'property:read';
export const PROPERTY_LIST = 'property:list';
export const PROPERTY_UPDATE = 'property:update';
export const PROPERTY_DELETE = 'property:delete';
export const PROPERTY_MANAGE = 'property:manage';

export const PROPERTY_PERMISSIONS = [
    { name: PROPERTY_CREATE, description: 'Create property' },
    { name: PROPERTY_READ, description: 'Read property' },
    { name: PROPERTY_LIST, description: 'List properties' },
    { name: PROPERTY_UPDATE, description: 'Update property' },
    { name: PROPERTY_DELETE, description: 'Delete property' },

    //for admin only
    { name: PROPERTY_MANAGE, description: 'Manage property' },
];
