// Tenant Service
// Tenant Controller

import { HydratedDocument } from 'mongoose';
import { ITenant, TenantModel } from './tenant.model';
import { CreateTenantPayloadType } from './tenant.validators';
import { RequestContext } from '../../shared/utils/contextBuilder';
import { PropertyService } from '../property/property.service';
import { RoomService } from '../room/room.service';
import { throwAppError } from '../../shared/utils/error';
import { CompanyService } from '../company/company.service';
import { USER_ROLES } from '../user/user.constants';

type TenantDocument = HydratedDocument<ITenant> | null;
const populate = [
    {
        path: 'roomID',
        select: 'roomNumber',
    },
];

const set = async (model: any, entity: HydratedDocument<ITenant>, ctx: RequestContext) => {
    if (model.firstName) {
        entity.firstName = model.firstName;
    }
    if (model.lastName) {
        entity.lastName = model.lastName;
    }
    if (model.gender) {
        entity.gender = model.gender;
    }
    if (model.phone) {
        entity.phone = model.phone;
    }
    if (model.email) {
        entity.email = model.email;
    }
    if (model.rentShare) {
        entity.rentShare = model.rentShare;
    }
    if (model.joiningDate) {
        entity.joiningDate = model.joiningDate;
    }
    if (model.leavingDate) {
        entity.leavingDate = model.leavingDate;
    }
    if (model.notes) {
        entity.notes = model.notes;
    }

    //this is crucial
    // allow only when there is actual change (i.s will in update)
    if (model.roomID && model.roomID != entity.roomID) {
        const room = await RoomService.get(model.roomID, ctx, { populate: true });

        if (!room || !room.propertyID._id) {
            return throwAppError('room or property not found', 404);
        }
        if (room.occupancyCount >= room.capacity) {
            return throwAppError('room is full', 400);
        }

        entity.roomID = room._id;
        entity.propertyID = room.propertyID._id;
        //TODO: ADDON: make a system journal entry for this
    }

    return entity;
};

const CREATE = async (payload: CreateTenantPayloadType, ctx: RequestContext) => {
    const user = ctx.user;
    const companyID: string = user?.companyID || '';

    // 1: check if tenant exists TODO:

    // 2: set bare minimum values
    let newTenant = new TenantModel({
        companyID: companyID,
    });

    // 3: set remaining values
    newTenant = await set(payload, newTenant, ctx);

    // 4: save tenant
    await newTenant.save();
    return newTenant;
};

const GET = async (query: string, ctx: RequestContext, options?: any): Promise<TenantDocument> => {
    let entity = null;
    const user = ctx.user;

    if (user?.role == USER_ROLES.ADMIN) {
        entity = TenantModel.findById({ _id: query });
    } else {
        //other user else than admin add ownership here
        entity = TenantModel.findOne({ _id: query, companyID: user?.companyID });
    }

    if (options?.populate) {
        entity = entity.populate(populate);
    }

    entity = await entity;
    if (!entity) {
        return throwAppError('tenant not found', 404);
    }

    return entity;
};

const SEARCH = async () => {};

const UPDATE = async () => {};

export const TenantService = {
    create: CREATE,
    update: UPDATE,
    search: SEARCH,
    get: GET,
};
