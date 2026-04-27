import { ResponseHandler } from '../utils/responseHandler';
import { verifyAccessToken } from '../utils/jwt';
import { RoleService } from '../../modules/access-management/role/role.service';
import { RequestContext } from '../utils/contextBuilder';
import { extractPermissionName } from '../utils/strings';
import { AUTH_TOKENS } from '../../modules/user/user.constants';

export const AuthMiddleware = async (req: any, res: any, next: any) => {
    try {
        const ctx: RequestContext = req?.context;
        if (!ctx) {
            return ResponseHandler.appResponse(res, 401, false, 'Context not found', null);
        }

        //1: get token from cookies
        const token = req.cookies[AUTH_TOKENS.XAT];
        if (!token) {
            return ResponseHandler.appResponse(res, 401, false, 'Token not found', null);
        }

        //2: verify token
        const decoded = verifyAccessToken(token);

        if (!decoded) {
            return ResponseHandler.appResponse(res, 401, false, 'Token expired', null);
        }

        //3: attach user to request object
        ctx.setUser(decoded);

        // fetch permissions
        const role = await RoleService.get(ctx.user?.role || '', ctx, { populate: true });

        const permissions = extractPermissionName(role?.permissions || []);
        ctx.setPermissions(permissions);

        next();
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode || 401, false, error?.message, null);
    }
};
