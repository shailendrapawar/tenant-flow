import express from 'express';
import { UserController } from './user.controller';
import { registry } from '../../shared/configs/registry';
import { LoginSchema, RegisterSchema } from './user.validators';
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware';
const UserRouter = express.Router();

// ====================================
// ============ register swagger config ============
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
registry.registerPath({
    method: 'post',
    path: '/users/login',
    tags: ['Auth'],
    summary: 'Login a user',
    request: {
        body: {
            content: { 'application/json': { schema: LoginSchema } },
            required: true,
        },
    },
    responses: {
        201: { description: 'User logged in successfully' },
        400: { description: 'Validation error' },
    },
});
registry.registerPath({
    method: 'post',
    path: '/users/logout',
    tags: ['Auth'],
    summary: 'Logout a user',
    request: {},
    responses: {
        201: { description: 'User logged out successfully' },
        400: { description: 'Validation error' },
    },
});

registry.registerPath({
    method: 'get',
    path: '/users/me',
    tags: ['Auth'],
    summary: 'Get user profile',
    request: {},
    responses: {
        201: { description: 'User profile fetched successfully' },
        400: { description: 'Validation error' },
    },
});

// =========================================
// ============ register routes ============
UserRouter.post('/register', UserController.register);
UserRouter.post('/login', UserController.login);
UserRouter.post('/logout', AuthMiddleware, UserController.logout);

UserRouter.get('/me', AuthMiddleware, UserController.getUserProfile);

// UserRouter.get('/:id', UserController.getById);
// UserRouter.get('/', UserController.search);

export default UserRouter;
