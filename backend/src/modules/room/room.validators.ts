// Room Validators

import { z } from 'zod';

export const CreateRoomsPayloadSchema = z.object({
    propertyID: z.string().openapi({ example: 'UUID ,i.e: -123e4567-e89b-12d3-a456-426614174000' }),
    companyID: z.string().openapi({ example: 'UUID ,i.e: -123e4567-e89b-12d3-a456-426614174000' }),
    rooms: z.array(
        z.object({
            roomNumber: z.string().openapi({ example: '1' }),
            floor: z.string().optional().openapi({ example: '101' }),
            roomRent: z.number().optional().openapi({ example: 100 }),
            capacity: z.number().openapi({ example: 2 }),
            notes: z.string().optional().openapi({ example: 'Notes' }),
        }),
    ),
});
export type CreateRoomsPayloadType = z.infer<typeof CreateRoomsPayloadSchema>;
