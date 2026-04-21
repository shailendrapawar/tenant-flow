import { z } from 'zod';
import { registry } from '../../shared/configs/registry';

export const RegisterSchema = z.object({
    firstName: z.string().min(1).openapi({ example: 'john' }),
    lastName: z.string().min(1).openapi({ example: 'doe' }),
    email: z.string().email().openapi({ example: 'john@example.com' }),
    password: z.string().min(1).openapi({ example: 'secret123' }),
});
export type RegisterPayload = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
    email: z.string().email().openapi({ example: 'john@example.com' }),
    password: z.string().min(1).openapi({ example: 'secret123' }),
});
export type LoginPayload = z.infer<typeof LoginSchema>;

registry.register('RegisterPayload', RegisterSchema);
registry.register('LoginPayload', LoginSchema);

export const UserValidators = { RegisterSchema, LoginSchema };
