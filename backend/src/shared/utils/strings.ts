import { v4 as uuidv4 } from 'uuid';

export const generateUUID = () => {
    return uuidv4();
};

export const extractPermissionName = (rawPermissions: any[]): string[] => {
    return rawPermissions.map((p) => p?.name);
};
