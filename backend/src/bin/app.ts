import '../shared/configs/registry'; // MUST BE FIRST
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../shared/configs/swagger.config';
import UserRouter from '../modules/user/user.routes';
import { ResponseHandler } from '../shared/utils/responseHandler';

// src/bin/server.ts  ← top of file, before other imports

const app = express();
app.use(express.json());

//apply root middlewares and routes here
app.get('/', (req, res) => {
    return ResponseHandler.success(
        res,
        200,
        'Server is running, Hello World!',
        null,
    );
});

// app.get('/health-check', (req, res) => {
//     return ResponseHandler.success(res, 200, 'Health check working', null);
// });

// api docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// inject routes=======>
app.use('/users', UserRouter);

export { app };
