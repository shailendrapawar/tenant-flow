import logger from './logger';
import { generateUUID } from './strings';

export type RequestContext = {
    requestId?: string;
    user?: any;
    permisisons?: string[];
    logger: typeof logger;
};

export const buildContext = (req: any, res: any, next: any) => {
    const claims = {
        requestId: generateUUID(),
        user: req?.user || null,
        logger: logger,
        permisisons: req?.permissions || [],
    };
    req.context = claims;
    next();
};
