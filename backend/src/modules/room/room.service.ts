// Room Service

import { HydratedDocument } from 'mongoose';
import { IRoom } from './room.model';
import { RequestContext } from '../../shared/utils/contextBuilder';
import { CreateRoomsPayloadType, SearchRoomsQueryType, UpdateRoomPayloadType } from './room.validators';
import { RoomModel } from './room.model';
import { PropertyService } from '../property/property.service';
import { throwAppError } from '../../shared/utils/error';
import { isObjectID, toObjectID } from '../../shared/utils/strings';
import { USER_ROLES } from '../user/user.constants';
import { ROOM_MANAGE } from './room.constants';

type RoomDocument = HydratedDocument<IRoom> | null;
const populate = [
    {
        path: 'propertyID',
        select: 'name',
    },
];

const set = async (
    model: UpdateRoomPayloadType,
    entity: HydratedDocument<IRoom>,
    ctx: RequestContext,
): Promise<HydratedDocument<IRoom>> => {
    if (model.floor) {
        entity.floor = model.floor;
    }
    if (model.roomNumber) {
        entity.roomNumber = model.roomNumber;
    }
    if (model.roomRent) {
        entity.roomRent = model.roomRent;
    }

    //FIXME: check condition before updating
    if (model.capacity) {
        entity.capacity = model.capacity;
    }
    if (model.occupancyCount) {
        entity.occupancyCount = model.occupancyCount;
    }

    if (model.operationalStatus) {
        entity.operationalStatus = model.operationalStatus;
    }
    if (model.notes) {
        entity.notes = model.notes;
    }

    return entity;
};

const CREATE = async (payload: CreateRoomsPayloadType, ctx: RequestContext) => {
    // TODO: start from here
    const user = ctx.user;
    const property = await PropertyService.get(payload.propertyID, ctx);
    if (!property) {
        return throwAppError('Property not found');
    }

    //1: check which rooms exist first
    const existingRooms = await RoomModel.find({
        propertyID: toObjectID(payload.propertyID),
        companyID: toObjectID(user?.companyID),
        roomNumber: { $in: payload.rooms.map((room) => room.roomNumber) },
    })
        .select('roomNumber')
        .lean();

    if (existingRooms.length > 0) {
        return throwAppError(`rooms already exists:${existingRooms.map((room) => room.roomNumber).join(',')}`, 400);
    }

    const newRooms: any[] = [];
    for (const room of payload.rooms) {
        const newRoom = new RoomModel({
            companyID: toObjectID(user?.companyID),
            propertyID: toObjectID(payload.propertyID),
            roomNumber: room.roomNumber,
            floor: room.floor,
            roomRent: room.roomRent,
            capacity: room.capacity,
            notes: room.notes,
        });

        newRooms.push(newRoom);
    }

    // const result = await Promise.all(newRooms);
    const result = await RoomModel.insertMany(newRooms, { ordered: false });
    return result;
};

const GET = async (query: any, ctx: RequestContext, options?: any): Promise<RoomDocument> => {
    //invalid query
    if (!query) return null;

    //already a document
    if (query._doc) {
        return query;
    }

    let entity = null;
    const where: Object = ctx.where();

    if (isObjectID(query)) {
        entity = RoomModel.findOne({ _id: toObjectID(query), ...where });
    } else {
        return throwAppError('Invalid room ID', 400);
    }

    if (entity) {
        if (options?.populate) {
            entity = entity.populate(populate);
        }
    }

    entity = await entity;

    return entity;
};
const SEARCH = async (query: SearchRoomsQueryType, ctx: RequestContext, options?: any) => {
    //TODO: improve this api
    const user = ctx.user;
    let sort: any = {
        timeStamp: -1,
    };
    let where: any = ctx.where();

    if (query.companyID && ctx.hasAllPermissions([ROOM_MANAGE])) {
        //optional case for admin override companyID
        where.companyID = toObjectID(query.companyID);
    }

    if (query.propertyID) {
        where.propertyID = toObjectID(query.propertyID);
    }
    if (query.roomNumber) {
        where.roomNumber = query.roomNumber;
    }
    if (query.floor) {
        where.floor = query.floor;
    }
    if (query.capacity) {
        where.capacity = query.capacity;
    }
    if (query.occupancyCount) {
        where.occupancyCount = query.occupancyCount;
    }

    if (query.operationalStatus) {
        where.operationalStatus = query.operationalStatus;
    }

    const countPromise = RoomModel.countDocuments(where);
    const itemsPromise = RoomModel.find(where)
        .populate(populate)
        .limit(options?.pagination?.limit)
        .skip(options?.pagination?.skip)
        .sort(sort);

    const [count, rooms] = await Promise.all([countPromise, itemsPromise]);
    return { count, rooms };
};

const UPDATE = async (id: string, model: UpdateRoomPayloadType, ctx: RequestContext) => {
    let entity = await GET(id, ctx);
    if (!entity) {
        return throwAppError('Room not found', 404);
    }
    entity = await set(model, entity, ctx);
    await entity?.save();
    return entity;
};

export const RoomService = {
    create: CREATE,
    get: GET,
    search: SEARCH,
    update: UPDATE,
};
