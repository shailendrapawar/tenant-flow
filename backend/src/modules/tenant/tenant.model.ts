// Tenant Model
import mongoose from 'mongoose';
import { TENANT_STATUS } from './tenant.constants';

const tenantSchema = new mongoose.Schema(
    {
        companyID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
            index: true,
        },

        propertyID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: true,
            index: true,
        },

        roomID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
            index: true,
        },

        // basic info
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            default: null,
        },

        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },

        // 🔥 future onboarding support
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },

        // rent logic
        rentShare: {
            type: Number,
            required: true,
        },

        // lifecycle
        joiningDate: {
            type: Date,
            required: true,
            default: Date.now,
        },

        leavingDate: {
            type: Date,
            default: null,
        },

        status: {
            type: String,
            enum: [TENANT_STATUS.LIVING, TENANT_STATUS.LEFT],
            default: TENANT_STATUS.LIVING,
            index: true,
        },

        notes: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    },
);

// // fast lookup per room
// tenantSchema.index({ roomID: 1, status: 1 });
// // fast lookup per room
// tenantSchema.index({ roomID: 1, status: 1 });

// // optional (avoid duplicate phone in same company)
// tenantSchema.index({ companyID: 1, phone: 1 }, { unique: false });

// export
export const TenantModel = mongoose.model('Tenant', tenantSchema);
export type ITenant = mongoose.InferSchemaType<typeof tenantSchema>;
