import { configDotenv } from 'dotenv';
configDotenv();

let ENV = {
    App: {
        Port: process.env.APP_PORT || 3000,
        Host: process.env.APP_HOST || 'localhost',
        Environment: process.env.APP_ENV || 'development',
    },
    DB: {
        URI: process.env.MONGO_URI || 'mongodb://localhost:27017/tenant-flow',
    },
    JWT: {
        Secret: process.env.JWT_SECRET || 'secret',
    },
};

export default ENV;
