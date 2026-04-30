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

// SEARCH
export const SearchTenantQuerySchema = z.object({
    //scope filters
    companyID: z.string().optional(), //admin
    propertyID: z.string().optional(),
    roomID: z.string().optional(),

    //tenant info filters
    firstName: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    status: z.enum(['living', 'left']).optional(),

    //computational fields
    joiningDateFrom: z.coerce.date().optional(),
    joiningDateTo: z.coerce.date().optional(),
    leavingDateFrom: z.coerce.date().optional(),
    leavingDateTo: z.coerce.date().optional(),

    minRent: z.number().min(0).optional(),
    maxRent: z.number().min(0).optional(),
});
export type SearchTenantQueryType = z.infer<typeof SearchTenantQuerySchema>;
