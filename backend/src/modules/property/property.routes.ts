// Property Routes
import express from 'express';
import { registry } from '../../shared/configs/registry';
import { PropertyController } from './property.controller';
import { createPropertySchema } from './property.validators';
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
            content: { 'application/json': { schema: createPropertySchema } },
            required: true,
        },
    },

    responses: {
        201: { description: 'Property added successfully' },
        400: { description: 'Validation error' },
    },
});

// =========================================
// ============ register routes ============
PropertyRouter.use(AuthMiddleware);
PropertyRouter.post('/', authorizedRoles([USER_ROLES.LANDLORD]), PropertyController.create);
