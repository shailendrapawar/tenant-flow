import { Error } from 'mongoose';
import { ResponseHandler } from '../../shared/utils/responseHandler';
import { UserService } from './user.service';
import { UserValidators } from './user.validators';

const LOGIN = async (req: any, res: any) => {
    //1: validations
};

const REGISTER = async (req: any, res: any) => {
    //1:
    try {
        const { data, success, error } =
            UserValidators.RegisterSchema.safeParse(req.body);

        if (!success) {
            return ResponseHandler.error(res, 400, 'Validation error', error);
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
        ResponseHandler.error(res, 500, 'Internal server error', error);
    }
};

export const UserController = {
    login: LOGIN,
    register: REGISTER,
};
