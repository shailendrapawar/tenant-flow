// Property Service

import { RequestContext } from '../../shared/utils/contextBuilder';
import { HydratedDocument } from 'mongoose';
import { IProperty, PropertyModel } from './property.model';
import { CreatePropertyPayload } from './property.validators';
import { PROPERTY_ACQUISITION_TYPES } from './property.constants';
import { throwAppError } from '../../shared/utils/error';

type PropertyDocument = HydratedDocument<IProperty> | null;

const set = () => {};

const create = async (payload: CreatePropertyPayload, ctx: RequestContext): Promise<PropertyDocument> => {
    const newProperty = new PropertyModel({
        name: payload.name,
        location: payload.location,
        companyID: ctx.user?.companyID,
        type: payload.type,
        acquisition: {
            //write only type of acquisition
            type: payload.acquisition.type,
        },
        description: payload.description,
    });

    //write details only if acquisition type is leased
    if (payload.acquisition.type == PROPERTY_ACQUISITION_TYPES.LEASED) {
        newProperty.acquisition.details = {
            startDate: payload.acquisition.details?.startDate,
            endDate: payload.acquisition.details?.endDate,
            rent: payload.acquisition.details?.rent,
            rentUnit: payload.acquisition.details?.rentUnit,
        };
    }

    const property = await newProperty.save();

    if (!property) {
        return throwAppError('Property not created', 500);
    }
    return property;
};
const get = () => {};
const search = () => {};

export const PropertyService = {
    set,
    create,
    get,
    search,
};
