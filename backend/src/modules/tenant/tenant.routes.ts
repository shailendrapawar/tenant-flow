// Tenant Routes

import express from 'express';
import { TenantController } from './tenant.controller';
import { USER_ROLES } from '../user/user.constants';
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware';
import { authorizedRoles } from '../../shared/middlewares/authorizeMiddleware';
import { registry } from '../../shared/configs/registry';
import { CreateTenantPayloadSchema } from './tenant.validators';
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

// =================================================
// ============ register routes ====================
TenantRouter.use(AuthMiddleware);
TenantRouter.use(authorizedRoles([USER_ROLES.ADMIN, USER_ROLES.LANDLORD]));

TenantRouter.post('/', TenantController.create);
TenantRouter.get('/:id', TenantController.get);
TenantRouter.get('/', TenantController.search);
TenantRouter.put('/:id', TenantController.update);
