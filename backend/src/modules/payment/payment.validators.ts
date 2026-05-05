// Payment Validators

import { objectIDRegex } from '../../shared/utils/strings';
import z from 'zod';

export const CreatePaymentPayloadSchema = z.object({
    // roomID: z
    //     .string()
    //     .regex(objectIDRegex)
    //     .openapi({ description: 'UUID ,i.e: -123e4567-e89b-12d3-a456-426614174000' }),
    tenantID: z
        .string()
        .regex(objectIDRegex)
        .openapi({ description: 'UUID ,i.e: -123e4567-e89b-12d3-a456-426614174000' }),
    amount: z.number().min(0),
    type: z.enum(['credit', 'debit']),
    method: z.enum(['cash', 'card', 'online']).optional(),
    paymentDate: z.coerce.date(),
    fromDate: z.coerce.date().optional(),
    toDate: z.coerce.date().optional(),
    notes: z.string().optional(),
});

export type CreatePaymentPayloadType = z.infer<typeof CreatePaymentPayloadSchema>;
