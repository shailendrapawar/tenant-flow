import { z } from 'zod';
import { registry } from '../../shared/configs/registry';
import { USER_STATUS } from './user.constants';

export const RegisterSchema = z.object({
    firstName: z.string().min(1).openapi({ example: 'john' }),
    lastName: z.string().openapi({ example: 'doe' }),
    email: z.string().email().openapi({ example: 'john@example.com' }),
    password: z.string().min(1).openapi({ example: 'Test@123' }),
});
export type RegisterPayload = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
    email: z.string().email().openapi({ example: 'john@example.com' }),
    password: z.string().min(1).openapi({ example: 'Test@123' }),
});

export type LoginPayload = z.infer<typeof LoginSchema>;

export const UpdateUserSchema = z.object({
    firstName: z.string().min(1).openapi({ example: 'john' }),
    lastName: z.string().openapi({ example: 'doe' }),
    status: z.string().openapi({ example: 'inactive' }),
})
export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>;

export const UserSearchQuerySchema = z.object({

    name: z.string().optional(),

    status: z.enum([
        USER_STATUS.ACTIVE,
        USER_STATUS.INACTIVE,
        USER_STATUS.SUSPENDED,
        USER_STATUS.BANNED,
    ]).optional(),
    
    page: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 1)),

    limit: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 10)),

})