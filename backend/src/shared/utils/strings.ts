import { v4 as uuidv4 } from 'uuid';
import { Types } from 'mongoose';
import { throwAppError } from './error';
export const generateUUID = () => {
    return uuidv4();
};

export const extractPermissionName = (rawPermissions: any[]): string[] => {
    return rawPermissions.map((p) => p?.name);
};

export const objectIDRegex = /^[0-9a-fA-F]{24}$/;

export const isObjectID = (id: string = '') => {
    return objectIDRegex.test(id);
};

export const toObjectID = (id: string = '') => {
    if (id.trim() == '') {
        throwAppError('invalid ID');
    }
    if (isObjectID(id)) {
        return id;
    }
    return new Types.ObjectId(id);
};

//dates
export const datesHandler = {
    regex: /^\d{4}-\d{2}-\d{2}$/,
};
