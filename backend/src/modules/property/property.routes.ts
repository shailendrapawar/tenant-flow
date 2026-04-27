// Property Routes
import express from 'express';
import { registry } from '../../shared/configs/registry';
import { PropertyController } from './property.controller';
import { CreatePropertySchema, PropertySearchQuerySchema } from './property.validators';
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware';
import { authorizedRoles } from '../../shared/middlewares/authorizeMiddleware';
import { USER_ROLES } from '../user/user.constants';

export const PropertyRouter = express.Router();

// =================================================
// ============ register swagger config ============
registry.registerPath({
    method: 'post',
    path: '/properties',
    tags: ['Properties'],
    summary: 'Add new Property',
    request: {
        body: {
            content: { 'application/json': { schema: CreatePropertySchema } },
            required: true,
        },
    },

    responses: {
        201: { description: 'Property added successfully' },
        400: { description: 'Validation error' },
    },
});
registry.registerPath({
    method: 'get',
    path: '/properties/{id}',
    tags: ['Properties'],
    summary: 'Get Property by ID',

    parameters: [
        {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
        },
    ],

    responses: {
        200: { description: 'Property retrieved successfully' },
        400: { description: 'Validation error' },
    },
});

registry.registerPath({
    method: 'get',
    path: '/properties',
    tags: ['Properties'],
    summary: 'Search properties',

    request: {
        query: PropertySearchQuerySchema,
    },

    responses: {
        200: { description: 'Properties retrieved successfully' },
        404: { description: 'Properties not found' },
    },
});

// =================================================
// ============ register routes ====================
PropertyRouter.use(AuthMiddleware);
PropertyRouter.post('/', authorizedRoles([USER_ROLES.LANDLORD]), PropertyController.create);
PropertyRouter.get('/:id', authorizedRoles([USER_ROLES.ADMIN, USER_ROLES.LANDLORD]), PropertyController.get);
PropertyRouter.get('/', authorizedRoles([USER_ROLES.ADMIN, USER_ROLES.LANDLORD]), PropertyController.search);
