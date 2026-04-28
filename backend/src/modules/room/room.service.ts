// Room Service

import { HydratedDocument } from 'mongoose';
import { IRoom } from './room.model';
import { RequestContext } from '../../shared/utils/contextBuilder';
import { CreateRoomsPayloadType } from './room.validators';
import { RoomModel } from './room.model';

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
    const newRooms: Promise<RoomDocument>[] = [];
    for (const room of payload.rooms) {
        const newRoom = new RoomModel({
            companyID: user?.companyID,
            propertyID: payload.propertyID,
            roomNumber: room.roomNumber,
            floor: room.floor,
            roomRent: room.roomRent,
            capacity: room.capacity,
            notes: room.notes,
        });
        newRooms.push(newRoom.save());
    }

    const result = await Promise.all(newRooms);
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
