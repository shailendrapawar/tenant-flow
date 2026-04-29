// Room Controller

import { extractUniqueRooms } from '../../shared/helpers/room.helper';
import { RequestContext } from '../../shared/utils/contextBuilder';
import { formatZodError, throwAppError } from '../../shared/utils/error';
import { ResponseHandler } from '../../shared/utils/responseHandler';
import { RoomService } from './room.service';
import { CreateRoomsPayloadSchema } from './room.validators';

const create = async (req: any, res: any) => {
    try {
        const ctx: RequestContext = req.context;

        //1: basic validations
        const { success, data, error } = CreateRoomsPayloadSchema.safeParse(req.body);

        //2: additional validation(remove duplicate rooms data)
        if (!success) {
            const validationErrors = formatZodError(error);

            return ResponseHandler.appResponse(res, 400, false, 'Validation Error', {
                fields: validationErrors,
            });
        }

        //3: extract unique rooms
        data.rooms = extractUniqueRooms(data?.rooms);

        const result = await RoomService.create(data, ctx);

        return ResponseHandler.appResponse(res, 201, true, 'Rooms created successfully', result);
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode || 500, false, error?.message, null);
    }
};

const get = async (req: any, res: any) => {
    try {
        const ctx = req.context;
        const { id } = req.params;

        if (id?.trim() == '') {
            return throwAppError('Invalid room id', 400);
        }

        const room = await RoomService.get(id, ctx, { poulate: true });
        return ResponseHandler.appResponse(res, 200, true, 'Room retrieved successfully', room);
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};

const search = async (req: any, res: any) => {};

const update = async (req: any, res: any) => {};

export const RoomController = {
    create,
    get,
    search,
    update,
};
