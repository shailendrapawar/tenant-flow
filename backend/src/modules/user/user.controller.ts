import { ResponseHandler } from '../../shared/utils/responseHandler';
import { UserService } from './user.service';
import { LoginPayloadSchema, RegisterPayloadSchema, UpdateUserPayloadSchema } from './user.validators';
import { formatZodError, throwAppError } from '../../shared/utils/error';
import { MapUserDTO } from './user.dto';
import { generateAcessToken } from '../../shared/utils/jwt';
import ENV from '../../shared/configs/app.config';
import logger from '../../shared/utils/logger';
import { CompanyService } from '../company/company.service';
import { AUTH_TOKENS, USER_ROLES } from './user.constants';
import { clearAppCookie, setAppCookie } from '../../shared/utils/cookies';
import { RequestContext } from '../../shared/utils/contextBuilder';
import { RequestHandler } from '../../shared/utils/requestHandler';

const registerAdmin = async (req: any, res: any) => {
    try {
        // TODO: Implement admin registration logic
    } catch (error) {
        logger.error('Error registering admin:', error);
        return ResponseHandler.appResponse(res, 500, false, 'Internal Server Error');
    }
};

const login = async (req: any, res: any) => {
    try {
        const ctx: RequestContext = req.ctx;
        //1: validations
        const { data, success, error } = LoginPayloadSchema.safeParse(req.body);

        if (!success) {
            const validationErrors = formatZodError(error);

            return ResponseHandler.appResponse(res, 400, false, 'Validation Error', {
                fields: validationErrors,
            });
        }

        let authUser = {};
        //2: call user  service
        let user = await UserService.login(data, ctx);

        if (!user) {
            return throwAppError('Invalid credentials', 401);
        }

        ctx?.setUser(user);
        authUser = MapUserDTO(user, 'auth');

        //3: call company service only if landlord
        if (user?.role == USER_ROLES.LANDLORD) {
            const { companies } = await CompanyService.search({}, ctx);
            if (companies?.length == 0) {
                return throwAppError('Company not found');
            }
            const company = companies[0];

            authUser = { ...authUser, companyID: company?._id?.toString() || '' };
        }

        //4: generate token and set cookie
        const token = generateAcessToken(authUser);
        clearAppCookie(res, AUTH_TOKENS.XAT);
        setAppCookie(res, AUTH_TOKENS.XAT, token);

        //5: map response according to role/action-key
        return ResponseHandler.appResponse(res, 200, true, 'Login successful', MapUserDTO(user, 'auth'));
    } catch (error: any) {
        console.log(error);
        return ResponseHandler.appResponse(res, error?.statusCode || 500, false, error?.message, null);
    }
};

const register = async (req: any, res: any) => {
    try {
        const ctx: RequestContext = req.ctx;
        //1: validation handling
        const { data, success, error } = RegisterPayloadSchema.safeParse(req.body);

        if (!success) {
            const validationErrors = formatZodError(error);

            return ResponseHandler.appResponse(res, 400, false, 'Validation Error', {
                fields: validationErrors,
            });
        }

        //2: call service
        const user = await UserService.register(data, ctx);

        return ResponseHandler.appResponse(res, 201, true, 'User created successfully', MapUserDTO(user, 'auth'));
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};

const getUserProfile = async (req: any, res: any) => {
    try {
        const ctx: RequestContext = req.ctx;
        const user = req.context.user;
        const userProfile = await UserService.get(user._id, ctx);

        return ResponseHandler.appResponse(res, 200, true, 'User profile fetched successfully', {
            user: MapUserDTO(userProfile, user.role), // send user data based on role
        });
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode || 500, false, error?.message, null);
    }
};

const logout = async (req: any, res: any) => {
    try {
        res.clearCookie('xat', {
            httpOnly: true,
            secure: ENV.App.Environment == 'production',
            sameSite: 'strict',
        });
        return ResponseHandler.appResponse(res, 200, true, 'Logout successful', null);
    } catch (error: any) {
        logger.error('Logout Error:', error);
        return ResponseHandler.appResponse(
            res,
            error?.statusCode || 500,
            false,
            error?.message || 'Logout failed',
            null,
        );
    }
};
const update = async (req: any, res: any) => {
    try {
        const ctx = req.context;
        const { id } = req.params;
        if (id?.trim() == '') {
            return throwAppError('Invalid company id', 400);
        }

        const { data, success, error } = UpdateUserPayloadSchema.safeParse(req.body);

        if (!success) {
            const validationErrors = formatZodError(error);

            return ResponseHandler.appResponse(res, 400, false, 'Validation Error', {
                fields: validationErrors,
            });
        }

        const user = await UserService.update(id, data, ctx);

        return ResponseHandler.appResponse(
            res,
            201,
            true,
            'User updated successfully',
            MapUserDTO(user, ctx?.user?.role),
        );
    } catch (error: any) {
        logger.error('User update Error:', error);
        return ResponseHandler.appResponse(
            res,
            error?.statusCode || 500,
            false,
            error?.message || 'Logout failed',
            null,
        );
    }
};

const get = async (req: any, res: any) => {
    try {
        const ctx = req.context;
        const { id } = req.params;

        if (id?.trim() == '') {
            return throwAppError('Invalid company id', 400);
        }

        const user = await UserService.get(id, ctx);

        return ResponseHandler.appResponse(
            res,
            200,
            true,
            'User retrieved successfully',
            MapUserDTO(user, ctx.user.role),
        );
    } catch (error: any) {
        logger.error('Get user error:', error);
        return ResponseHandler.appResponse(
            res,
            error?.statusCode || 500,
            false,
            error?.message || 'Logout failed',
            null,
        );
    }
};
const search = async (req: any, res: any) => {
    try {
        const ctx = req.context;
        const query = RequestHandler.parseQuery(req);
        const pagination = RequestHandler.getPagination(req);

        const users = await CompanyService.search(query, ctx, { pagination });

        return ResponseHandler.appResponse(res, 200, true, 'Users retrieved successfully', users);
    } catch (error: any) {
        logger.error('Get users search error:', error);
        return ResponseHandler.appResponse(
            res,
            error?.statusCode || 500,
            false,
            error?.message || 'Logout failed',
            null,
        );
    }
};

export const UserController = {
    registerAdmin,
    register,
    login,
    logout,

    getUserProfile,
    update,
    get,
    search,
};
