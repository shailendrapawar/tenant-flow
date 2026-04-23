// Company Routes
import { registry } from '../../shared/configs/registry';
import express from 'express';
import { CompanyControler } from './company.controller';
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

// =========================================
// ============ register routes ============
CompanyRouter.get('/:id', CompanyControler.get);
