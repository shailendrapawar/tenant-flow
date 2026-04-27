import logger from './logger';
import { generateUUID } from './strings';

type User = {
    _id: string;
    email: string;
    role: string;
    companyID?: string;
};
export type RequestContext = {
    requestID?: string;
    user: User | null;
    permissions: string[];
    logger: typeof logger;

    setUser: (user: any) => void;
    setPermissions: (permissions: string[]) => void;
    hasAnyPermissions: (required: string[]) => boolean;
    hasAllPermissions: (required: string[]) => boolean;
};

export const buildContext = (req: any, res: any, next: any) => {
    const context: RequestContext = {
        requestID: generateUUID(),
        user: req?.user || null,
        logger: logger,
        permissions: req?.permissions || [],

        setUser: (userData: any) => {
            const user: User = {
                _id: userData._id,
                email: userData.email,
                role: userData.role,
            };
            if (userData?.companyID) {
                user.companyID = userData.companyID;
            }
            req.context.user = user;
        },

        setPermissions(permissions: string[]) {
            // later: validate, log, merge with role defaults
            // req.context.logger.info('permissions attached to context', { count: permissions.length });
            req.context.permissions = permissions;
        },

        // either this OR that
        hasAnyPermissions(required: string[]) {
            for (const item of required) {
                if (req.context.permissions.includes(item)) {
                    return true;
                }
            }
            return false;
        },

        // must have this AND that
        hasAllPermissions(required: string[]) {
            for (const item of required) {
                if (!req.context.permissions.includes(item)) {
                    return false;
                }
            }
            return true;
        },
    };
    req.context = context;
    next();
};

declare global {
    namespace Express {
        interface Request {
            context: RequestContext;
        }
    }
}
