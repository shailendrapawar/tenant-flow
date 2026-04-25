// middleware/authorize.ts

import { NextFunction } from 'express';

export const authorizeRole = (...roles: string[]) => {
    return (req: any, res: any, next: NextFunction) => {
        if (!req.context?.user?.role) {
            return res.status(401).json({ error: 'Unauthorized, no role found' });
        }
        if (!roles.includes(req.context.user.role)) {
            return res.status(403).json({ error: 'Forbidden, insufficient role' });
        }
        next();
    };
};
