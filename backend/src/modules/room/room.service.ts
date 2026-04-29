// Room Service

import { HydratedDocument } from 'mongoose';
import { IRoom } from './room.model';
import { RequestContext } from '../../shared/utils/contextBuilder';
import { CreateRoomsPayloadType } from './room.validators';
import { RoomModel } from './room.model';
import { PropertyService } from '../property/property.service';
import { throwAppError } from '../../shared/utils/error';
import { toObjectID } from '../../shared/utils/strings';

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

    //1: check which rooms exist first ====>
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
const GET = async () => {};
const SEARCH = async () => {};
const UPDATE = async () => {};

export const RoomService = {
    create: CREATE,
    get: GET,
    search: SEARCH,
    update: UPDATE,
};
