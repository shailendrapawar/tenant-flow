// Payment Routes
import express from 'express';
import { registry } from '../../shared/configs/registry';
import { CreatePaymentPayloadSchema, SearchPaymentsQuerySchema, UpdatePaymentPayloadSchema } from './payment.validators';
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware';
import { PaymentController } from './payment.controller';
import { authorizedRoles } from '../../shared/middlewares/authorizeMiddleware';
import { USER_ROLES } from '../user/user.constants';

export const PaymentRouter = express.Router();
// =================================================
// ============ register swagger config ============
registry.registerPath({
    //CREATE PAYMENT
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

registry.registerPath({
    //GET PAYMENT
    method: 'get',
    path: '/payments/{id}',
    tags: ['Payments'],
    summary: 'Get Payment by ID',

    parameters: [
        {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
        },
    ],

    responses: {
        200: { description: 'Payment retrieved successfully' },
        400: { description: 'Validation error' },
    },
});

registry.registerPath({
    //SEARCH 
    method: 'get',
    path: '/payments',
    tags: ['Payments'],
    summary: 'Search payments',

    request: {
        query: SearchPaymentsQuerySchema,
    },

    responses: {
        200: { description: 'Payments retrieved successfully' },
        404: { description: 'Payments not found' },
    },
});

registry.registerPath({
    //Update payments
    method: 'put',
    path: '/payments/{id}',
    tags: ['Payments'],
    summary: 'update payment',
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
            content: { 'application/json': { schema: UpdatePaymentPayloadSchema } },
            required: true,
        },
    },

    responses: {
        200: { description: 'Payment updated successfully' },
        404: { description: 'Payment not found' },
    },
});
// =================================================
// ============ register routes ====================
PaymentRouter.use(AuthMiddleware);
PaymentRouter.use(authorizedRoles([USER_ROLES.ADMIN, USER_ROLES.LANDLORD]));

PaymentRouter.get('/:id', PaymentController.get);
PaymentRouter.get("/", PaymentController.search)
PaymentRouter.post('/', PaymentController.create);
PaymentRouter.put('/:id', PaymentController.update);
