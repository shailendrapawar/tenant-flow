// Room Constants
export const ROOM_OPERATIONAL_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
} as const;

export type RoomOperationalStatus = (typeof ROOM_OPERATIONAL_STATUS)[keyof typeof ROOM_OPERATIONAL_STATUS];

// ===============================================================
// =================ROOM ENTITY PERMISSIONS====================

export const ROOM_CREATE = 'room:create';
export const ROOM_READ = 'room:read';
export const ROOM_LIST = 'room:list';
export const ROOM_UPDATE = 'room:update';
export const ROOM_DELETE = 'room:delete';

export const ROOM_MANAGE = 'room:manage';

export const ROOM_PERMISSIONS = [
    { name: ROOM_CREATE, description: 'Create room' },
    { name: ROOM_READ, description: 'Read room' },
    { name: ROOM_LIST, description: 'List rooms' },
    { name: ROOM_UPDATE, description: 'Update room' },
    { name: ROOM_DELETE, description: 'Delete room' },

    { name: ROOM_MANAGE, description: 'Manage room' }, // aggregate permission for admin
];
