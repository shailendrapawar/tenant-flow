import mongoose from 'mongoose';
import { IUser, UserModel } from './user.model';
import { LoginPayload, RegisterPayload } from './user.validators';
import bcrypt from 'bcrypt';
import { throwAppError } from '../../shared/utils/error';

import { HydratedDocument } from 'mongoose';
import { CompanyService } from '../company/company.service';
import { CreateCompanyPayload } from '../company/company.types';
import { USER_ROLES } from './user.constants';

type UserDocument = HydratedDocument<IUser> | null;

const populate: any[] = [];

const set = (payload: any) => {
    console.log(payload);
};

const create = async (model: RegisterPayload): Promise<UserDocument> => {
    let user = null;

    // 1: get if existing user
    user = await GET(model.email, { lean: true });

    if (user) {
        return throwAppError('User already exists with this email', 400);
    }

    // 2: hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(model.password, salt);

    // 3: create user
    const newUser = new UserModel({
        ...model,
        password: hashedPassword,
    });

    user = await newUser.save();

    // 4: create default company
    const newCompanyPayload: CreateCompanyPayload = {
        companyNamePrefix: user.lastName || user.firstName,
        ownerID: user._id.toString(),
        ownerEmail: model.email,
    };

    await CompanyService.create(newCompanyPayload);

    return user;
};

// ====================================
// ============ export methods ============
const GET = async (keyword: string, options?: any): Promise<UserDocument> => {
    let query = null;

    if (mongoose.isValidObjectId(keyword)) {
        // find by objectID
        query = UserModel.findOne({ _id: keyword });
    } else if (keyword.includes('@')) {
        // find by email
        query = UserModel.findOne({ email: keyword?.toLowerCase() });
    } else {
        // error invalid identifier
        return throwAppError('Invalid identifier', 400);
        // return null;
    }

    if (options?.populate) {
        query = query?.populate(populate);
    }
    return await query;
};

const SEARCH = () => {};
const UPDATE = () => {};

const REGISTER = async (model: RegisterPayload): Promise<UserDocument> => {
    // create user
    const user = await create(model);
    //perform side effects like mailing of onboard
    return user;
};

const LOGIN = async (model: LoginPayload): Promise<UserDocument> => {
    // get user
    let user = await GET(model.email, {});

    if (!user) {
        return throwAppError('User does not exist', 400);
    }

    // check password
    const isMatch = await bcrypt.compare(model.password, user.password);

    if (!isMatch) {
        //invalid credentials
        user.lastLoginAt = new Date();
        user.loginAttempts = (user.loginAttempts || 0) + 1;
        // TODO:lock account if attempts crosses 3
        await user.save();
        return throwAppError('Invalid credentials', 401);
    }

    // update lastLoginAt
    user.lastLoginAt = new Date();
    user.loginAttempts = 0; // reset login attempts on successful login
    await user.save();

    return user;
};

export const UserService = {
    register: REGISTER,
    login: LOGIN,
    get: GET,
    search: SEARCH,
    update: UPDATE,
};
