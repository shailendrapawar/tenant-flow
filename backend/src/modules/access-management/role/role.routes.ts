// Role Routes

import express from 'express';
import { RoleController } from './role.controller';
import { registry } from '../../../shared/configs/registry';
import { AuthMiddleware } from '../../../shared/middlewares/authMiddleware';

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
RoleRouter.get('/:id', AuthMiddleware, RoleController.get);
