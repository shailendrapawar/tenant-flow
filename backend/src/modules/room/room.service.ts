// Room Service

import { HydratedDocument } from 'mongoose';
import { IRoom } from './room.model';
import { RequestContext } from '../../shared/utils/contextBuilder';
import { CreateRoomsPayloadType, SearchRoomsQueryType } from './room.validators';
import { RoomModel } from './room.model';
import { PropertyService } from '../property/property.service';
import { throwAppError } from '../../shared/utils/error';
import { toObjectID } from '../../shared/utils/strings';
import { USER_ROLES } from '../user/user.constants';

type RoomDocument = HydratedDocument<IRoom> | null;
const populate = [
    {
        path: 'propertyID',
        select: 'name',
    },
];

const set = async (model: any, entity: Promise<HydratedDocument<IRoom>>): Promise<HydratedDocument<IRoom>> => {
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
const GET = async (id: string, ctx: RequestContext, options?: any) => {
    let query = null;
    const user = ctx.user;

    if (user?.role === USER_ROLES.LANDLORD) {
        query = RoomModel.findOne({ _id: toObjectID(id), companyID: toObjectID(user?.companyID) });
    } else {
        query = RoomModel.findOne({ _id: toObjectID(id) });
    }

    if (options?.populate) {
        query = query.populate(options.populate);
    }

    const room = await query;
    if (!room) {
        return throwAppError('Room not found', 404);
    }

    return room;
};
const SEARCH = async (query: SearchRoomsQueryType, ctx: RequestContext, options?: any) => {
    //TODO: improve this api
    const user = ctx.user;
    let sort: any = {
        timeStamp: -1,
    };
    let where: any = {};

    //scope in companyID for landlord only
    if (user?.role === USER_ROLES.LANDLORD) {
        where.companyID = user?.companyID;
    }

    if (query.companyID) {
        //optional case for admin
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

const UPDATE = async () => {};

export const RoomService = {
    create: CREATE,
    get: GET,
    search: SEARCH,
    update: UPDATE,
};
