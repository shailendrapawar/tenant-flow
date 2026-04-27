// Property Service

import { RequestContext } from '../../shared/utils/contextBuilder';
import { HydratedDocument } from 'mongoose';
import { IProperty, PropertyModel } from './property.model';
import { CreatePropertyPayload } from './property.validators';
import { PROPERTY_ACQUISITION_TYPES, PROPERTY_MANAGE } from './property.constants';
import { throwAppError } from '../../shared/utils/error';
import { USER_ROLES } from '../user/user.constants';

type PropertyDocument = HydratedDocument<IProperty> | null;
const populate = [
    {
        path: 'companyID',
        select: 'owner',
        populate: { path: 'owner', select: 'name email' },
    },
];

const set = () => {};

const CREATE = async (payload: CreatePropertyPayload, ctx: RequestContext): Promise<PropertyDocument> => {
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
const GET = async (id: string, ctx: RequestContext, options?: any): Promise<PropertyDocument> => {
    let query = null;
    const user = ctx.user;

    if (user?.role === USER_ROLES.ADMIN) {
        query = PropertyModel.findById(id);
    } else {
        query = PropertyModel.findOne({ _id: id, companyID: user?.companyID });
    }

    if (options?.populate) {
        query = query.populate(populate);
    }

    const property = await query;

    if (!property) {
        return throwAppError('Property not found', 404);
    }

    return property;
};

const SEARCH = async (query: any, ctx: RequestContext, options?: any) => {
    const user = ctx.user;
    let sort: any = {
        timeStamp: -1,
    };
    let where: any = {};

    //scope in companyID for landlord only
    if (user?.role === USER_ROLES.LANDLORD) {
        where.companyID = user?.companyID;
    }

    if (query.name) {
        where.name = { $regex: query.name, $options: 'i' };
    }
    if (query.type) {
        where.type = query.type;
    }
    if (query.address) {
        where['location.addressLine1'] = { $regex: query.address, $options: 'i' };
    }
    if (query.city) {
        where['location.city'] = query.city;
    }
    if (query.state) {
        where['location.state'] = query.state;
    }
    if (query.status) {
        where.status = query.status;
    }

    //for admin to search properties based on companyID
    if (query.companyID && ctx.hasAllPermissions([PROPERTY_MANAGE])) {
        where.companyID = query.companyID;
    }
    const countPromise = PropertyModel.countDocuments(where);
    const itemsPromise = PropertyModel.find(where)
        .populate(populate)
        .limit(options?.pagination?.limit)
        .skip(options?.pagination?.skip)
        .sort(sort);

    const [count, properties] = await Promise.all([countPromise, itemsPromise]);
    return { count, properties };
};

export const PropertyService = {
    set,
    create: CREATE,
    get: GET,
    search: SEARCH,
};
