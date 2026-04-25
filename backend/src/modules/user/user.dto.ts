import { USER_ROLES } from './user.constants';
import { User } from './user.types';
import { HydratedDocument } from 'mongoose';

const Admin_userDTO = (user: HydratedDocument<User>) => ({ ...user?.toJSON() });
const Private_userDTO = (user: HydratedDocument<User>) => ({
    _id: user._id.toString(),
    firstName: user.firstName,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    status: user.status,
    lastLoginAt: user.lastLoginAt,
    meta: user.meta,
});

const Public_userDTO = (user: HydratedDocument<User>) => ({
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatar: user.avatar,
});

const Auth_userDTO = (user: HydratedDocument<User>) => ({
    _id: user._id.toString(),
    email: user.email,
    role: user.role,
});

// ======================================================================
// ================== mapping function for response ==================
export const MapUserDTO = (data: any, key?: string) => {
    const map = {
        [USER_ROLES.ADMIN]: Admin_userDTO,
        [USER_ROLES.LANDLORD]: Private_userDTO,
        [USER_ROLES.TENANT]: Public_userDTO,
        ['auth']: Auth_userDTO,
        // add other special cases only when necessary
    };

    const dtoFunction = key ? map[key] : map['auth'];
    if (!dtoFunction) {
        throw new Error(`No DTO function found for key: ${key}`);
    }
    const mappedData = dtoFunction(data);
    return mappedData;
};
