// Property Model
import mongoose from 'mongoose';
import { PROPERTY_TYPES, PROPERTY_ACQUISITION_TYPES, PROPERTY_STATUS } from './property.constants';

const acquisitionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: [PROPERTY_ACQUISITION_TYPES.OWNED, PROPERTY_ACQUISITION_TYPES.LEASED],
        required: true,
    },
    details: {
        startDate: Date,
        endDate: Date,
        rent: Number,
        rentUnit: String,
        default: {},
    },
});

const propertySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            addressLine1: { type: String, required: true },
            addressLine2: String,
            city: { type: String, required: true },
            state: { type: String, required: true },
            district: { type: String, required: true },
            country: { type: String, required: true },
            postalCode: { type: String },
        },

        companyID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
            index: true,
        },

        type: {
            type: String,
            enum: [PROPERTY_TYPES.APARTMENT, PROPERTY_TYPES.HOUSE, PROPERTY_TYPES.HOSTEL, PROPERTY_TYPES.COMMERCIAL],
            required: true,
        },

        acquisition: {
            type: acquisitionSchema,
            required: true,
        },

        // Optional but useful
        description: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: [PROPERTY_STATUS.ACTIVE, PROPERTY_STATUS.INACTIVE, PROPERTY_STATUS.SUSPENDED, PROPERTY_STATUS.BANNED],
            default: PROPERTY_STATUS.ACTIVE,
        },
    },
    {
        timestamps: true,
    },
);

export const PropertyModel = mongoose.model('Property', propertySchema);
export type IProperty = mongoose.InferSchemaType<typeof propertySchema>;
export type IAcquisition = mongoose.InferSchemaType<typeof acquisitionSchema>;
