import { ResponseHandler } from '../utils/responseHandler';
import { verifyAccessToken } from '../utils/jwt';

export const AuthMiddleware = (req: any, res: any, next: any) => {
    try {
        //1: get token from cookies

        const token = req.cookies['xat'];
        if (!token) {
            return ResponseHandler.appResponse(res, 401, false, 'Token not found', null);
        }

        //2: verify token
        const decoded = verifyAccessToken(token);

        if (!decoded) {
            return ResponseHandler.appResponse(res, 401, false, 'Token expired', null);
        }

        //3: attach user to request object
        req.user = decoded;
        next();
    } catch (error: any) {
        return ResponseHandler.appResponse(
            res,
            error?.statusCode || 401,
            false,
            error?.message,
            null,
        );
    }
};
