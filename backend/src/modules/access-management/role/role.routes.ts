// Role Routes

import express from 'express';
import { RoleController } from './role.controller';
import { registry } from '../../../shared/configs/registry';
import { AuthMiddleware } from '../../../shared/middlewares/authMiddleware';
import { authorizedRoles } from '../../../shared/middlewares/authorizeMiddleware';
import { USER_ROLES } from '../../user/user.constants';

export const RoleRouter = express.Router();

// =================================================
// ============ register swagger config ============
registry.registerPath({
    method: 'get',
    path: '/roles/{id}',
    tags: ['Role'],
    summary: 'Get a role',
    parameters: [
        {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
        },
    ],
    responses: {
        200: { description: 'Role retrieved successfully' },
        404: { description: 'Role not found' },
    },
});

// =========================================
// ============ register routes ============
RoleRouter.use(AuthMiddleware) //group level auth middleware

RoleRouter.get('/:id',
    authorizedRoles([USER_ROLES.ADMIN]),
    RoleController.get
);
