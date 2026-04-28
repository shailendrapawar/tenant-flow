// Room Model

import mongoose from 'mongoose';
import { validate } from 'uuid';
import { ROOM_OPERATIONAL_STATUS } from './room.constants';

const roomSchema = new mongoose.Schema(
    {
        // Add your room schema here
        companyID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
        },
        propertyID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: true,
        },
        roomNumber: {
            type: String,
            trim: true,
            required: true,
        },
        floor: {
            type: Number,
            required: true,
        },
        roomRent: {
            type: Number,
        },
        capacity: {
            type: Number,
            required: true,
        },
        occupancyCount: {
            //only be updated by system not api or directly
            type: Number,
            default: 0,
            min: 0,
            validate: {
                validator: function (value: number): boolean {
                    return value <= this.capacity;
                },
                message: 'Occupancy cannot exceed capacity',
            },
        },
        operationalStatus: {
            type: String,
            enum: [
                ROOM_OPERATIONAL_STATUS.ACTIVE,
                ROOM_OPERATIONAL_STATUS.INACTIVE,
                ROOM_OPERATIONAL_STATUS.MAINTENANCE,
            ],
            default: ROOM_OPERATIONAL_STATUS.ACTIVE,
        },
        notes: {
            //like if maintenance is scheduled
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    },
);
//prevent duplicate room of same(room number, floor, property)
roomSchema.index({ propertyID: 1, roomNumber: 1, floor: 1 }, { unique: true });

export const RoomModel = mongoose.model('Room', roomSchema);
export type IRoom = mongoose.InferSchemaType<typeof roomSchema>;
