// Property Constants

// 1: model constants
export const PROPERTY_TYPES = {
    APARTMENT: 'apartment',
    HOUSE: 'hous',
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
