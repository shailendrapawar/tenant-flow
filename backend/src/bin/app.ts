import '../shared/configs/registry'; // MUST BE FIRST
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../shared/configs/swagger.config';
import { UserRouter } from '../modules/user/user.routes';
import { CompanyRouter } from '../modules/company/company.routes';
import { ResponseHandler } from '../shared/utils/responseHandler';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import { buildContext } from '../shared/utils/contextBuilder';
import { INIT_SYSTEM_DATA } from '../env/init_env';
import { RoleRouter } from '../modules/access-management/role/role.routes';

// src/bin/server.ts  ← top of file, before other imports

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: 'http://localhost:3000', // frontend URL
        credentials: true, // ✅ VERY IMPORTANT
    }),
);

//apply root middlewares and routes here
app.get('/', (req, res) => {
    return ResponseHandler.appResponse(res, 200, true, 'Server is running, Hello World!', null);
});

//all system data like roles,permission
INIT_SYSTEM_DATA();

// api docs============>
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// inject routes=======>
app.use('/users', buildContext, UserRouter);
app.use('/companies', buildContext, CompanyRouter);
app.use('/roles', buildContext, RoleRouter);

export { app };
