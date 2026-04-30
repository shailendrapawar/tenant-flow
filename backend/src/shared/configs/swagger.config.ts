import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { registry } from './registry';
import '../../modules/user/user.routes';
import '../../modules/company/company.routes';
import '../../modules/access-management/role/role.routes';
import '../../modules/property/property.routes';
import '../../modules/room/room.routes';
import '../../modules/tenant/tenant.routes';

export const swaggerSpec = new OpenApiGeneratorV3(registry.definitions).generateDocument({
    openapi: '3.0.0',
    info: {
        title: 'Tenant Flow API',
        version: '1.0.0',
        description: 'API documentation for Tenant Flow',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Development server' }],
});
