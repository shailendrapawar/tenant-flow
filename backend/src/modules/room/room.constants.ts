// Room Constants
export const ROOM_OPERATIONAL_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
} as const;

export type RoomOperationalStatus = (typeof ROOM_OPERATIONAL_STATUS)[keyof typeof ROOM_OPERATIONAL_STATUS];
