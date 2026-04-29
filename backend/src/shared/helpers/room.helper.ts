import { string } from 'zod';
import { CreateRoomsPayloadType } from '../../modules/room/room.validators';

export const extractUniqueRooms = (data: CreateRoomsPayloadType['rooms'] = []) => {
    const set = new Set();
    let result: CreateRoomsPayloadType['rooms'] = [];

    data.forEach((item) => {
        const isExist = set.has(item.roomNumber);
        if (!isExist) {
            result.push(item);
            set.add(item.roomNumber);
        }
    });
    return result;
};
