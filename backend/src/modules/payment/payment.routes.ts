// Payment Routes
import express from 'express';
import { registry } from '../../shared/configs/registry';
import { CreatePaymentPayloadSchema } from './payment.validators';
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware';
import { PaymentController } from './payment.controller';
import { authorizedRoles } from '../../shared/middlewares/authorizeMiddleware';
import { USER_ROLES } from '../user/user.constants';

export const PaymentRouter = express.Router();
// =================================================
// ============ register swagger config ============
registry.registerPath({
    //CREATE TENANT
    method: 'post',
    path: '/payments',
    tags: ['Payments'],
    summary: 'Create new payment',
    request: {
        body: {
            content: { 'application/json': { schema: CreatePaymentPayloadSchema } },
            required: true,
        },
    },

    responses: {
        201: { description: 'Payment created successfully' },
        400: { description: 'Validation error' },
    },
});

// =================================================
// ============ register routes ====================
PaymentRouter.use(AuthMiddleware);
PaymentRouter.use(authorizedRoles([USER_ROLES.ADMIN, USER_ROLES.LANDLORD]));

PaymentRouter.post('/', PaymentController.create);
