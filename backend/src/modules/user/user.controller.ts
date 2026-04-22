import { ResponseHandler } from '../../shared/utils/responseHandler';
import { UserService } from './user.service';
import { UserValidators } from './user.validators';
import { formatZodError, throwError } from '../../shared/utils/error';
import { MapUserDTO } from './user.dto';
import { generateToken } from '../../shared/utils/jwt';
import ENV from '../../shared/configs/app.config';

const LOGIN = async (req: any, res: any) => {
    try {
        //1: validations
        const { data, success, error } = UserValidators.LoginSchema.safeParse(req.body);

        if (!success) {
            const validationErrors = formatZodError(error);

            return ResponseHandler.appResponse(res, 400, false, 'Validation Error', {
                fields: validationErrors,
            });
        }

        //2: call service
        const user = await UserService.login(data);
        if (!user) {
            return ResponseHandler.appResponse(res, 400, false, 'Invalid email or password', null);
        }

        //3: generate token and set cookie
        const token = generateToken(MapUserDTO(user, 'auth'));
        res.cookie('x-access-token', token, {
            httpOnly: true,
            secure: ENV.App.Environment == 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        //4: map response according to role/action-key
        return ResponseHandler.appResponse(
            res,
            200,
            true,
            'Login successful',
            MapUserDTO(user, 'auth'),
        );
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.status || 500, false, error?.message, null);
    }
};

const REGISTER = async (req: any, res: any) => {
    try {
        //1: validation handling
        const { data, success, error } = UserValidators.RegisterSchema.safeParse(req.body);

        if (!success) {
            const validationErrors = formatZodError(error);

            return ResponseHandler.appResponse(res, 400, false, 'Validation Error', {
                fields: validationErrors,
            });
        }

        //2: call service
        const user = await UserService.register(data);

        return ResponseHandler.appResponse(res, 201, true, 'User created successfully', user);
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};

export const UserController = {
    login: LOGIN,
    register: REGISTER,
};
