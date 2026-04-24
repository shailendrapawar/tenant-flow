// Company Routes
import { registry } from '../../shared/configs/registry';
import express from 'express';
import { CompanyControler } from './company.controller';
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware';
import { CompanySearchQuerySchema, UpdateCompanySchema } from './company.validators';
export const CompanyRouter = express.Router();
// =================================================
// ============ register swagger config ============
registry.registerPath({
    method: 'get',
    path: '/companies/{id}',
    tags: ['Company'],
    summary: 'Get a company',
    parameters: [
        {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
        },
    ],
    responses: {
        200: { description: 'Company retrieved successfully' },
        404: { description: 'Company not found' },
    },
});

registry.registerPath({
    method: 'get',
    path: '/companies',
    tags: ['Company'],
    summary: 'Search companies',

    request: {
        query: CompanySearchQuerySchema,
    },

    responses: {
        200: { description: 'Companies retrieved successfully' },
        404: { description: 'Companies not found' },
    },
});

registry.registerPath({
    method: 'put',
    path: '/companies/{id}',
    tags: ['Company'],
    summary: 'Update a company',
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
            content: { 'application/json': { schema: UpdateCompanySchema } },
            required: true,
        },
    },
    responses: {
        200: { description: 'Company retrieved successfully' },
        404: { description: 'Company not found' },
    },
});

// =========================================
// ============ register routes ============
CompanyRouter.get('/:id', AuthMiddleware, CompanyControler.get);
CompanyRouter.get('/', AuthMiddleware, CompanyControler.search);
CompanyRouter.put('/:id', AuthMiddleware, CompanyControler.update);
