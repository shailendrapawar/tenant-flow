// Payment Validators

import { objectIDRegex } from '../../shared/utils/strings';
import z from 'zod';
import { PAYMENT_METHODS, PAYMENT_TYPES } from './payment.constants';

// CREATE ==========================================>
export const CreatePaymentPayloadSchema = z.object({
    tenantID: z
        .string()
        .regex(objectIDRegex)
        .openapi({ description: 'UUID ,i.e: -123e4567-e89b-12d3-a456-426614174000' }),
    amount: z.number().min(0),
    type: z.enum([PAYMENT_TYPES.CREDIT, PAYMENT_TYPES.DEBIT]),
    method: z.enum([PAYMENT_METHODS.CASH, PAYMENT_METHODS.UPI, PAYMENT_METHODS.BANK]).optional(),
    paymentDate: z.coerce.date(),
    fromDate: z.coerce.date().optional(),
    toDate: z.coerce.date().optional(),
    notes: z.string().optional(),
});
export type CreatePaymentPayloadType = z.infer<typeof CreatePaymentPayloadSchema>;

// UPDATE ==========================================>
export const UpdatePaymentPayloadSchema = z.object({
    amount: z.number().min(0).optional(),
    type: z.enum([PAYMENT_TYPES.CREDIT, PAYMENT_TYPES.DEBIT]).optional(),
    method: z.enum([PAYMENT_METHODS.CASH, PAYMENT_METHODS.UPI, PAYMENT_METHODS.BANK]).optional(),
    paymentDate: z.coerce.date().optional(),
    fromDate: z.coerce.date().optional(),
    toDate: z.coerce.date().optional(),
    notes: z.string().optional(),
});
export type UpdatePaymentPayloadType = z.infer<typeof UpdatePaymentPayloadSchema>;


//SEARCH =========================================>
export const SearchPaymentsQuerySchema = z.object({
    //scope filters
    companyID: z //admin
        .string()
        .regex(objectIDRegex)
        .optional()
        .openapi({ description: 'UUID ,i.e: -123e4567-e89b-12d3-a456-426614174000' }),

    tenantID: z
        .string()
        .regex(objectIDRegex)
        .optional()
        .openapi({ description: 'UUID ,i.e: -123e4567-e89b-12d3-a456-426614174000' }),
    roomID: z
        .string()
        .regex(objectIDRegex)
        .optional()
        .openapi({ description: 'UUID ,i.e: -123e4567-e89b-12d3-a456-426614174000' }),

    amount: z.number().min(0).optional(),
    type: z.enum([PAYMENT_TYPES.CREDIT, PAYMENT_TYPES.DEBIT]).optional(),
    method: z.enum([PAYMENT_METHODS.CASH, PAYMENT_METHODS.UPI, PAYMENT_METHODS.BANK]).optional(),

    fromDate: z.coerce.date().optional(),
    toDate: z.coerce.date().optional(),

})

export type SearchPaymentsQueryType = z.infer<typeof SearchPaymentsQuerySchema>