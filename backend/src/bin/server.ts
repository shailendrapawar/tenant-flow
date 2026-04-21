import { app } from './app';
import ENV from '../shared/configs/app.config';
import logger from '../shared/utils/logger';
import connectDB from '../shared/configs/connectDB';

async function main() {
    logger.info('Starting server...');

    connectDB()
        .then((v) => {
            app.listen(ENV.App.Port, () => {
                // console.log("Server is running on port:", Config.App.Port)
                logger.info('Server is running on port:', ENV.App.Port);

                console.log('Server is running on port:', ENV.App.Port);
            });
        })
        .catch((err) => {
            logger.error('Failed to start server:', err);
            process.exit(1);
        });
}

main();
