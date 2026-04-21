import '../shared/configs/registry'; // MUST BE FIRST
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../shared/configs/swagger.config';
import UserRouter from '../modules/user/user.routes';

// src/bin/server.ts  ← top of file, before other imports

const app = express();

//apply root middlewares and routes here
app.get('/', (req, res) => {
    res.send('Server is running, Hello World!');
});

app.get('/health-check', (req, res) => {
    res.send('Server is running, Hello World!');
});

// api docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// user routes
app.use('/users', UserRouter);

export { app };
