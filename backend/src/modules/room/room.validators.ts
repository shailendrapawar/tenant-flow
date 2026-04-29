// Room Validators

import { z } from 'zod';
import { objectIDRegex } from '../../shared/utils/strings';
import { ROOM_OPERATIONAL_STATUS } from './room.constants';
const { ACTIVE, INACTIVE, MAINTENANCE } = ROOM_OPERATIONAL_STATUS;

export const CreateRoomsPayloadSchema = z.object({
    propertyID: z
        .string()
        .regex(objectIDRegex)
        .openapi({ description: 'UUID ,i.e: -123e4567-e89b-12d3-a456-426614174000' }),
    rooms: z.array(
        z.object({
            roomNumber: z.string().openapi({ example: '101' }),
            floor: z.string().optional().openapi({ example: '1' }),
            roomRent: z.number().optional().openapi({ example: 10000 }),
            capacity: z.number().openapi({ example: 2 }),
            notes: z.string().optional().openapi({ example: 'Notes for room' }),
        }),
    ),
});
export type CreateRoomsPayloadType = z.infer<typeof CreateRoomsPayloadSchema>;

export const SearchRoomsQuerySchema = z.object({
    companyID: z.string().regex(objectIDRegex).optional(),
    propertyID: z.string().regex(objectIDRegex).optional(),
    roomNumber: z.string().optional(),
    floor: z.number().optional(),
    capacity: z.number().optional(),
    occupancyCount: z.number().optional(),
    operationalStatus: z.enum([ACTIVE, INACTIVE, MAINTENANCE]).optional(),
});
export type SearchRoomsQueryType = z.infer<typeof SearchRoomsQuerySchema>;
