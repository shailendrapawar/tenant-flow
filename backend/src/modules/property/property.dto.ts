// Property DTO

import { HydratedDocument } from 'mongoose';
import { USER_ROLES } from '../user/user.constants';
import { IProperty } from './property.model';

export const MapPropertyDTO = (data: any, key?: string | '') => {
    const Admin_companyDTO = (property: HydratedDocument<IProperty>) => ({
        ...property?.toObject(),
    });
    const Private_companyDTO = (property: HydratedDocument<IProperty>) => ({
        name: property.name,
        type: property.type,
        acquisition: property.acquisition,
        description: property.description,

        location: property.location,
    });

    const Public_companyDTO = (property: HydratedDocument<IProperty>) => ({
        name: property.name,
        location: property.location,
        description: property.description,
    });

    const map = {
        [USER_ROLES.ADMIN]: Admin_companyDTO,
        [USER_ROLES.LANDLORD]: Private_companyDTO,
        [USER_ROLES.TENANT]: Public_companyDTO,
        '': Public_companyDTO,
        // add other special cases only when necessary
    };

    const dtoFunction = key ? map[key] : null;
    if (!dtoFunction) {
        throw new Error(`No DTO function found for key: ${key}`);
    }
    const mappedData = dtoFunction(data);
    return mappedData;
};
