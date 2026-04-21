import { Error } from 'mongoose';
import { ResponseHandler } from '../../shared/utils/responseHandler';
import { UserService } from './user.service';
import { UserValidators } from './user.validators';
import { formatZodError, throwError } from '../../shared/utils/error';

const LOGIN = async (req: any, res: any) => {
    //1: validations
};

const REGISTER = async (req: any, res: any) => {
    //1:
    try {
        const { data, success, error } =
            UserValidators.RegisterSchema.safeParse(req.body);

        if (!success) {
            const validationErrors = formatZodError(error);
            return ResponseHandler.error(res, 400, "Validation Error", {
                fields: validationErrors,
            });
        }

        //2: business logic
        const user = await UserService.register(data);

        return ResponseHandler.success(
            res,
            201,
            'User created successfully',
            user,
        );
    } catch (error: any) {
        return ResponseHandler.error(res, error?.statusCode, error?.message, error);
    }
};

export const UserController = {
    login: LOGIN,
    register: REGISTER,
};
