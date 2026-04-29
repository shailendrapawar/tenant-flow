// Room Validators

import { z } from 'zod';

export const CreateRoomsPayloadSchema = z.object({
    propertyID: z.string().openapi({ description: 'UUID ,i.e: -123e4567-e89b-12d3-a456-426614174000' }),
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
