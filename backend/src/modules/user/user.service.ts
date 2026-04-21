import mongoose from 'mongoose';
import UserModel, { User } from './user.model';
import { RegisterPayload } from './user.validators';
import bcrypt from 'bcrypt';

const populate: any[] = [];

const set = (payload: any) => {
    console.log(payload);
};

const create = async (model: RegisterPayload): Promise<User | null> => {
    let user = null;

    // 1: get if existing user
    user = await GET(model.email, { lean: true });

    if (user) {
        throw new Error('User already exists');
    }

    // 2: hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(model.password, salt);

    // 3: create user
    const newUser = new UserModel({
        ...model,
        password: hashedPassword,
        roles: 'landlord',
    });

    user = await newUser.save();

    return user;
};

// ====================================
// ============ export methods ============
const GET = async (keyword: string, options: any): Promise<User | null> => {
    let entity = null;

    if (mongoose.isValidObjectId(keyword)) {
        // find by objectID
        entity = await UserModel.findOne({ _id: keyword });
    } else if (keyword.includes('@')) {
        // find by email
        entity = await UserModel.findOne({ email: keyword?.toLowerCase() });
    } else {
        // error invalid identifier
        throw new Error('Invalid identifier');
    }

    if (entity) {
        if (options.populate) {
            //process for options
            entity = await entity.populate(populate);
        }
        if (options.lean) {
            entity = entity.toObject();
        }
    }
    return entity;
};
const SEARCH = () => {};
const UPDATE = () => {};

const REGISTER = async (model: RegisterPayload) => {
    // create user
    const user = await create(model);
    //perform side effects like mailing of onboard
    return user;
};
export const UserService = {
    register: REGISTER,
    get: GET,
    search: SEARCH,
    update: UPDATE,
};
