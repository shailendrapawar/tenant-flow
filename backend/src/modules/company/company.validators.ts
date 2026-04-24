import { z } from 'zod';
import { COMPANY_STATUS } from './company.constants';
import { settings } from 'node:cluster';

export const UpdateCompanySchema = z.object({
    name: z.string().min(1).openapi({ example: 'john' }),
    logo: z
        .object({
            url: z.string().url().openapi({ example: 'https://example.com/logo.png' }),
            id: z.string().openapi({ example: '123' }),
        })
        .optional(),
    contact: z
        .object({
            phone: z.string().openapi({ example: '1234567890' }),
            email: z.string().email().openapi({ example: 'john@example.com' }),
        })
        .optional(),

    status: z
        .enum([COMPANY_STATUS.ACTIVE, COMPANY_STATUS.INACTIVE, COMPANY_STATUS.SUSPENDED, COMPANY_STATUS.BANNED])
        .optional(),

    location: z
        .object({
            addressLine1: z.string().openapi({ example: '123 Main St' }),
            addressLine2: z.string().openapi({ example: 'Apt 4B' }),
            city: z.string().openapi({ example: 'New York' }),
            state: z.string().openapi({ example: 'NY' }),
            district: z.string().openapi({ example: 'Manhattan' }),
            country: z.string().openapi({ example: 'USA' }),
            postalCode: z.string().openapi({ example: '10001' }),
        })
        .optional(),

    settings: z
        .object({
            //can contain themes etc's further
            type: z.any(),
            default: z.any(),
        })
        .optional(),

    meta: z
        .object({
            //can contain additional metadata like account status messages
            type: z.any(),
            default: z.any(),
        })
        .optional(),
});
