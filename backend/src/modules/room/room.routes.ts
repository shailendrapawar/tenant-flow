// Room Routes
import express from 'express';
import { registry } from '../../shared/configs/registry';
import { RoomController } from './room.controller';
import { AuthMiddleware } from '../../shared/middlewares/authMiddleware';

export const RoomRouter = express.Router();

// =================================================
// ============ register swagger config ============

// =================================================
// ============ register routes ====================
RoomRouter.use(AuthMiddleware);
// RoomRouter.post('/', RoomController.create);
// RoomRouter.get('/:id', RoomController.get);
// RoomRouter.get('/', RoomController.search);
// RoomRouter.put('/:id', RoomController.update);
