import mongoose from 'mongoose';
import { IUser, UserModel } from './user.model';
import {
    InitializeAdminPayloadType,
    LoginPayloadType,
    RegisterPayloadType,
    UpdateUserPayloadType,
} from './user.validators';
import bcrypt from 'bcrypt';
import { throwAppError } from '../../shared/utils/error';

import { HydratedDocument } from 'mongoose';
import { CompanyService } from '../company/company.service';
import { CreateCompanyPayload } from '../company/company.types';
import { RequestContext } from '../../shared/utils/contextBuilder';
import { USER_ROLES } from './user.constants';
import ENV from '../../shared/configs/app.config';

type UserDocument = HydratedDocument<IUser> | null;

const populate: any[] = [];

const set = async (model: any, entity: HydratedDocument<IUser>, ctx: RequestContext): Promise<UserDocument> => {
    if (model.firstName) {
        entity.firstName = model.firstName;
    }
    if (model.lastName) {
        entity.lastName = model.lastName;
    }

    return entity;
};

const create = async (model: RegisterPayloadType, ctx: RequestContext): Promise<UserDocument> => {
    let user = null;

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

    await CompanyService.create(newCompanyPayload, ctx);

    return user;
};

// ====================================
// ============ export methods ============
const GET = async (keyword: string, ctx: RequestContext, options?: any): Promise<UserDocument> => {
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

const SEARCH = async (query: any, ctx: RequestContext, options?: any) => {
    let sort: any = {
        timeStamp: -1,
    };
    let where: any = {};

    if (query.status) {
        where.status = query.status;
    }
    if (query.role) {
        where.role = query.role;
    }

    if (query.name) {
        where.name = { $regex: query.name, $options: 'i' };
    }
    const countPromise = UserModel.countDocuments(where);
    const itemsPromise = UserModel.find(where)
        .populate(populate)
        .limit(options?.pagination?.limit)
        .skip(options?.pagination?.skip)
        .sort(sort);
    const [count, users] = await Promise.all([countPromise, itemsPromise]);
    return { count, users };
};

const UPDATE = async (id: string, model: UpdateUserPayloadType, ctx: RequestContext): Promise<UserDocument> => {
    let entity = await UserService.get(id, ctx);

    if (!entity) {
        return throwAppError('User not found', 404);
    }

    entity = await set(model, entity, ctx);

    await entity?.save();

    return entity;
};

const REGISTER = async (model: RegisterPayloadType, ctx: RequestContext): Promise<UserDocument> => {
    let user = null;

    // 1: get if existing user
    user = await GET(model.email, ctx, { lean: true });

    if (user) {
        return throwAppError('User already exists with this email', 400);
    }

    // create user
    user = await create(model, ctx);
    //perform side effects like mailing of onboard
    return user;
};

const LOGIN = async (model: LoginPayloadType, ctx: RequestContext): Promise<UserDocument> => {
    // get user
    let user = await GET(model.email, ctx);

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

const INIT_ADMIN = async (model: InitializeAdminPayloadType, ctx: RequestContext): Promise<UserDocument> => {
    //1: check if any admin role already exists
    let admin = null;
    admin = await SEARCH({ role: USER_ROLES.ADMIN }, ctx);

    if (admin?.count > 0) {
        return throwAppError('Admin already exists', 403);
    }

    //check the payload
    const isMatch = ENV.App.INIT_ADMIN_TOKEN === model.initAdminToken;
    if (!isMatch) {
        return throwAppError('Invalid token', 403);
    }

    // 2: hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(model.password, salt);

    const newAdmin = new UserModel({
        firstName: model.firstName,
        lastName: model.lastName,
        email: model.email,
        password: hashedPassword,
        role: USER_ROLES.ADMIN,
    });

    admin = await newAdmin.save();

    return admin;
};

export const UserService = {
    register: REGISTER,
    login: LOGIN,
    get: GET,
    search: SEARCH,
    update: UPDATE,
    initAdmin: INIT_ADMIN,
};
