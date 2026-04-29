// Room Routes
import express from 'express';
import { registry } from '../../shared/configs/registry';
import { RoomController } from './room.controller';
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware';
import { CreateRoomsPayloadSchema, SearchRoomsQuerySchema, UpdateRoomPayloadSchema } from './room.validators';
import { authorizedRoles } from '../../shared/middlewares/authorizeMiddleware';
import { USER_ROLES } from '../user/user.constants';

export const RoomRouter = express.Router();

// =================================================
// ============ register swagger config ============

registry.registerPath({    //CREATE ROOMS
    method: 'post',
    path: '/rooms',
    tags: ['Rooms'],
    summary: 'Add new Rooms',
    request: {
        body: {
            content: { 'application/json': { schema: CreateRoomsPayloadSchema } },
            required: true,
        },
    },

    responses: {
        201: { description: 'Rooms added successfully' },
        400: { description: 'Validation error' },
    },
});
registry.registerPath({  //GET ROOM
    method: 'get',
    path: '/rooms/{id}',
    tags: ['Rooms'],
    summary: 'Get Room by ID',

    parameters: [
        {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
        },
    ],

    responses: {
        200: { description: 'Room retrieved successfully' },
        400: { description: 'Validation error' },
    },
});

registry.registerPath({   //SEARCH ROOMS
    method: 'get',
    path: '/rooms',
    tags: ['Rooms'],
    summary: 'Search rooms',

    request: {
        query: SearchRoomsQuerySchema,
    },

    responses: {
        200: { description: 'Rooms retrieved successfully' },
        404: { description: 'Rooms not found' },
    },
});

registry.registerPath({   //UPDATE ROOM
    method: 'put',
    path: '/rooms/{id}',
    tags: ['Rooms'],
    summary: 'update room',
    parameters: [
        {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
        },
    ],
    request: {
        body: {
            content: { 'application/json': { schema: UpdateRoomPayloadSchema } },
            required: true,
        },
    },

    responses: {
        200: { description: 'Room updated successfully' },
        404: { description: 'Room not found' },
    },
});

// =================================================
// ============ register routes ====================
RoomRouter.use(AuthMiddleware);
RoomRouter.use(authorizedRoles([USER_ROLES.ADMIN, USER_ROLES.LANDLORD]))

RoomRouter.post('/', RoomController.create);
RoomRouter.get('/:id', RoomController.get);
RoomRouter.get('/', RoomController.search);
RoomRouter.put('/:id', RoomController.update);
