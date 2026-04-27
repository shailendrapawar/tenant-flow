// Company Routes
import { registry } from '../../shared/configs/registry';
import express from 'express';
import { CompanyControler } from './company.controller';
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware';
import { CompanySearchQuerySchema, UpdateCompanySchema } from './company.validators';
import { authorizedRoles } from '../../shared/middlewares/authorizeMiddleware';
import { USER_ROLES } from '../user/user.constants';
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
CompanyRouter.use(AuthMiddleware); //group level auth middleware

CompanyRouter.get('/:id', authorizedRoles([USER_ROLES.ADMIN, USER_ROLES.LANDLORD]), CompanyControler.get);

CompanyRouter.get('/', authorizedRoles([USER_ROLES.ADMIN, USER_ROLES.LANDLORD]), CompanyControler.search);

CompanyRouter.put('/:id', authorizedRoles([USER_ROLES.ADMIN, USER_ROLES.LANDLORD]), CompanyControler.update);
