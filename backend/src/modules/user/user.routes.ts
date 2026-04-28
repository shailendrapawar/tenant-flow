import express from 'express';
import { UserController } from './user.controller';
import { registry } from '../../shared/configs/registry';
import {
    LoginPayloadSchema,
    RegisterPayloadSchema,
    UpdateUserPayloadSchema,
    SearchUserQuerySchema,
    InitializeAdminPayloadSchema,
} from './user.validators';
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware';
import { authorizedRoles } from '../../shared/middlewares/authorizeMiddleware';
import { USER_ROLES } from './user.constants';

export const UserRouter = express.Router();

// ====================================
// ============ register swagger config ============
registry.registerPath({
    method: 'post',
    path: '/users/auth/init-admin',
    tags: ['Users-auth'],
    summary: 'Initialize admin',
    request: {
        body: {
            content: { 'application/json': { schema: InitializeAdminPayloadSchema } },
            required: true,
        },
    },
    responses: {
        201: { description: 'Admin intiialization successfull' },
        400: { description: 'Validation error' },
    },
});
registry.registerPath({
    method: 'post',
    path: '/users/auth/register',
    tags: ['Users-auth'],
    summary: 'Register a new user',
    request: {
        body: {
            content: { 'application/json': { schema: RegisterPayloadSchema } },
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
    path: '/users/auth/login',
    tags: ['Users-auth'],
    summary: 'Login a user',
    request: {
        body: {
            content: { 'application/json': { schema: LoginPayloadSchema } },
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
    path: '/users/auth/logout',
    tags: ['Users-auth'],
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
    tags: ['Users'],
    summary: 'Get logged-in user profile',
    responses: {
        200: { description: 'User profile fetched successfully' },
        400: { description: 'Validation error' },
    },
});

registry.registerPath({
    method: 'put',
    path: '/users/{id}',
    tags: ['Users'],
    summary: 'Update a  user',
    parameters: [
        {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
        },
    ],
    request: {
        body: {
            content: { 'application/json': { schema: UpdateUserPayloadSchema } },
            required: true,
        },
    },
    responses: {
        201: { description: 'User updated successfully' },
        400: { description: 'Validation error' },
    },
});

registry.registerPath({
    method: 'get',
    path: '/users/{id}',
    tags: ['Users'],
    summary: 'Get a user',
    parameters: [
        {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
        },
    ],

    responses: {
        200: { description: 'Get user' },
        400: { description: 'Validation error' },
    },
});

registry.registerPath({
    method: 'get',
    path: '/users',
    tags: ['Users'],
    summary: 'Search users',

    request: {
        query: SearchUserQuerySchema,
    },

    responses: {
        200: { description: 'Companies retrieved successfully' },
        404: { description: 'Companies not found' },
    },
});
// =========================================
// ============ register routes ============

//auth routes
UserRouter.post('/auth/init-admin', UserController.initializeAdmin);
UserRouter.post('/auth/register', UserController.register);
UserRouter.post('/auth/login', UserController.login);
UserRouter.post('/auth/logout', AuthMiddleware, UserController.logout);

//user routes
UserRouter.get('/me', AuthMiddleware, UserController.getUserProfile);
UserRouter.get('/:id', AuthMiddleware, authorizedRoles([USER_ROLES.ADMIN]), UserController.get);
UserRouter.get('/', AuthMiddleware, authorizedRoles([USER_ROLES.ADMIN]), UserController.search);
UserRouter.put('/:id', AuthMiddleware, authorizedRoles([USER_ROLES.ADMIN, USER_ROLES.LANDLORD]), UserController.update);
