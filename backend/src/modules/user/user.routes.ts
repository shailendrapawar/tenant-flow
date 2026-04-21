import express from 'express';
import { UserController } from './user.controller';
import { registry } from '../../shared/configs/registry';
import { RegisterSchema } from './user.validators';

const UserRouter = express.Router();

registry.registerPath({
    method: 'post',
    path: '/users/register',
    tags: ['Auth'],
    summary: 'Register a new user',
    request: {
        body: {
            content: { 'application/json': { schema: RegisterSchema } },
            required: true,
        },
    },
    responses: {
        201: { description: 'User registered successfully' },
        400: { description: 'Validation error' },
    },
});

UserRouter.post('/register', UserController.register);

export default UserRouter;
