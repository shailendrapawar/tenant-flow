// Tenant Routes

import express from 'express';
import { TenantController } from './tenant.controller';
import { USER_ROLES } from '../user/user.constants';
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware';
import { authorizedRoles } from '../../shared/middlewares/authorizeMiddleware';
import { registry } from '../../shared/configs/registry';
import { CreateTenantPayloadSchema, SearchTenantQuerySchema, UpdateTenantPayloadSchema } from './tenant.validators';
export const TenantRouter = express.Router();

// =================================================
// ============ register swagger config ============

registry.registerPath({
    //CREATE TENANT
    method: 'post',
    path: '/tenants',
    tags: ['Tenants'],
    summary: 'Add new Tenant',
    request: {
        body: {
            content: { 'application/json': { schema: CreateTenantPayloadSchema } },
            required: true,
        },
    },

    responses: {
        201: { description: 'Tenant created successfully' },
        400: { description: 'Validation error' },
    },
});

registry.registerPath({
    //GET TENANT
    method: 'get',
    path: '/tenants/{id}',
    tags: ['Tenants'],
    summary: 'Get Tenant by ID',

    parameters: [
        {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
        },
    ],

    responses: {
        200: { description: 'Tenant retrieved successfully' },
        400: { description: 'Validation error' },
    },
});

registry.registerPath({
    method: 'get',
    path: '/tenants',
    tags: ['Tenants'],
    summary: 'Search tenants',

    request: {
        query: SearchTenantQuerySchema,
    },

    responses: {
        200: { description: 'Properties retrieved successfully' },
        404: { description: 'Properties not found' },
    },
});

registry.registerPath({
    method: 'put',
    path: '/tenants/{id}',
    tags: ['Tenants'],
    summary: 'update tenant',
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
            content: { 'application/json': { schema: UpdateTenantPayloadSchema } },
            required: true,
        },
    },

    responses: {
        200: { description: 'Tenant updated successfully' },
        404: { description: 'Tenant not found' },
    },
});


// =================================================
// ============ register routes ====================
TenantRouter.use(AuthMiddleware);
TenantRouter.use(authorizedRoles([USER_ROLES.ADMIN, USER_ROLES.LANDLORD]));

TenantRouter.post('/', TenantController.create);
TenantRouter.get('/:id', TenantController.get);
TenantRouter.get('/', TenantController.search);
TenantRouter.put('/:id', TenantController.update);
