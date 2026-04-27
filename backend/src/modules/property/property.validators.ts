// Property Validators

import z from 'zod';
import { PROPERTY_ACQUISITION_TYPES, PROPERTY_STATUS, PROPERTY_TYPES } from './property.constants';

//1: create===========================================>
export const CreatePropertyPayloadSchema = z.object({
    name: z.string().min(1).openapi({ example: 'jantwal properties' }),
    location: z.object({
        addressLine1: z.string().min(1).openapi({ example: '123 Main St' }),
        addressLine2: z.string().optional(),
        city: z.string().min(1).openapi({ example: 'New York' }),
        state: z.string().min(1).openapi({ example: 'NY' }),
        district: z.string().min(1).openapi({ example: 'Manhattan' }),
        country: z.string().min(1).openapi({ example: 'USA' }),
        postalCode: z.string().optional(),
    }),

    type: z
        .enum([PROPERTY_TYPES.APARTMENT, PROPERTY_TYPES.HOUSE, PROPERTY_TYPES.HOSTEL, PROPERTY_TYPES.COMMERCIAL])
        .openapi({
            example: 'apartment',
            description: `Available values: ${Object.values(PROPERTY_TYPES).join(', ')}`,
        }),

    acquisition: z.object({
        type: z.enum([PROPERTY_ACQUISITION_TYPES.OWNED, PROPERTY_ACQUISITION_TYPES.LEASED]).openapi({
            example: 'owned',
            description: `Available values: ${Object.values(PROPERTY_ACQUISITION_TYPES).join(', ')}`,
        }),
        details: z.object({
            startDate: z.coerce.date().openapi({ example: '2025-01-01' }),
            endDate: z.coerce.date().optional().openapi({ example: '2026-01-01' }),
            rent: z.number().optional().openapi({ example: 100000 }),
            rentUnit: z.string().optional().openapi({ example: 'monthly' }),
        }),
    }),
    description: z.string().optional().openapi({ example: 'A beautiful apartment in the heart of the city' }),
});
export type CreatePropertyPayloadType = z.infer<typeof CreatePropertyPayloadSchema>;

//2: update ========================================>
export const UpdatePropertyPayloadSchema = z.object({
    name: z.string().min(1).optional().openapi({ example: 'jantwal properties' }),
    location: z
        .object({
            addressLine1: z.string().min(1).openapi({ example: '123 Main St' }),
            addressLine2: z.string().optional(),
            city: z.string().min(1).openapi({ example: 'New York' }),
            state: z.string().min(1).openapi({ example: 'NY' }),
            district: z.string().min(1).openapi({ example: 'Manhattan' }),
            country: z.string().min(1).openapi({ example: 'USA' }),
            postalCode: z.string().optional(),
        })
        .optional(),
    type: z
        .enum([PROPERTY_TYPES.APARTMENT, PROPERTY_TYPES.HOUSE, PROPERTY_TYPES.HOSTEL, PROPERTY_TYPES.COMMERCIAL])
        .optional()
        .openapi({
            example: 'apartment',
            description: `Available values: ${Object.values(PROPERTY_TYPES).join(', ')}`,
        }),
    acquisition: z
        .object({
            type: z.enum([PROPERTY_ACQUISITION_TYPES.OWNED, PROPERTY_ACQUISITION_TYPES.LEASED]).openapi({
                example: 'owned',
                description: `Available values: ${Object.values(PROPERTY_ACQUISITION_TYPES).join(', ')}`,
            }),
            details: z.object({
                startDate: z.coerce.date().openapi({ example: '2025-01-01' }),
                endDate: z.coerce.date().optional().openapi({ example: '2026-01-01' }),
                rent: z.number().optional().openapi({ example: 100000 }),
                rentUnit: z.string().optional().openapi({ example: 'monthly' }),
            }),
        })
        .optional(),
    description: z.string().optional().openapi({ example: 'A beautiful apartment in the heart of the city' }),
    status: z
        .enum([PROPERTY_STATUS.ACTIVE, PROPERTY_STATUS.INACTIVE, PROPERTY_STATUS.BANNED, PROPERTY_STATUS.SUSPENDED])
        .optional()
        .openapi({
            example: 'active',
            description: `Available values: ${Object.values(PROPERTY_STATUS).join(', ')}`,
        }),
});
export type UpdatePropertyPayloadType = z.infer<typeof UpdatePropertyPayloadSchema>;

//search  ===========================================>
export const SearchPropertyQuerySchema = z.object({
    name: z.string().optional(),
    type: z
        .enum([PROPERTY_TYPES.APARTMENT, PROPERTY_TYPES.HOUSE, PROPERTY_TYPES.HOSTEL, PROPERTY_TYPES.COMMERCIAL])
        .optional()
        .openapi({
            example: 'apartment',
            description: `Available values: ${Object.values(PROPERTY_TYPES).join(', ')}`,
        }),

    address: z.string().optional().openapi({}),
    city: z.string().optional().openapi({}),
    state: z.string().optional().openapi({}),

    //for admin
    status: z
        .enum([PROPERTY_STATUS.ACTIVE, PROPERTY_STATUS.INACTIVE, PROPERTY_STATUS.SUSPENDED, PROPERTY_STATUS.BANNED])
        .optional()
        .openapi({}),
    companyID: z.string().optional().openapi({
        description: 'admin only',
    }),
});

export type SearchPropertyQueryType = z.infer<typeof SearchPropertyQuerySchema>;
