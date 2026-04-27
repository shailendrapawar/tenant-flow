import { z } from 'zod';
import { USER_STATUS } from './user.constants';

//1: register ====================================>
export const RegisterPayloadSchema = z.object({
    firstName: z.string().min(1).openapi({ example: 'john' }),
    lastName: z.string().openapi({ example: 'doe' }),
    email: z.string().email().openapi({ example: 'john@example.com' }),
    password: z.string().min(1).openapi({ example: 'Test@123' }),
});
export type RegisterPayloadType = z.infer<typeof RegisterPayloadSchema>;

//2: login======================================>
export const LoginPayloadSchema = z.object({
    email: z.string().email().openapi({ example: 'john@example.com' }),
    password: z.string().min(1).openapi({ example: 'Test@123' }),
});
export type LoginPayloadType = z.infer<typeof LoginPayloadSchema>;

//3: update user================================>
export const UpdateUserPayloadSchema = z.object({
    firstName: z.string().min(1).openapi({ example: 'john' }),
    lastName: z.string().openapi({ example: 'doe' }),
    status: z.string().openapi({ example: 'inactive' }),
});
export type UpdateUserPayloadType = z.infer<typeof UpdateUserPayloadSchema>;

//4: search user================================>
export const SearchUserQuerySchema = z.object({
    name: z.string().optional(),

    status: z.enum([USER_STATUS.ACTIVE, USER_STATUS.INACTIVE, USER_STATUS.SUSPENDED, USER_STATUS.BANNED]).optional(),

    page: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 1)),

    limit: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 10)),
});
export type SearchUserQueryType = z.infer<typeof SearchUserQuerySchema>;
