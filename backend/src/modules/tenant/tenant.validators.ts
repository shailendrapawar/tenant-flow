// Tenant Validators

import { z } from 'zod';
import { objectIDRegex } from '../../shared/utils/strings';
import { phoneHandler } from '../../shared/utils/numbers';

// CREATE========================================>
export const CreateTenantPayloadSchema = z.object({
    roomID: z
        .string()
        .regex(objectIDRegex)
        .openapi({ description: 'UUID ,i.e: -123e4567-e89b-12d3-a456-426614174000' }),

    firstName: z.string(),
    lastName: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    phone: z.string().regex(phoneHandler.regex),
    email: z.string().email(),

    rentShare: z.number().min(0).max(100),
    joiningDate: z.coerce.date().optional(),
    leavingDate: z.coerce.date().optional(),
    notes: z.string().optional(),
});

export type CreateTenantPayloadType = z.infer<typeof CreateTenantPayloadSchema>;
