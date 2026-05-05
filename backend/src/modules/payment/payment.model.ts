import mongoose from 'mongoose';
import { PAYMENT_METHODS, PAYMENT_TYPES } from './payment.constants';

// Payment Model
const paymentSchema = new mongoose.Schema(
    {
        //owner-ship and scope-in fields
        companyID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
            index: true,
        },
        tenantID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tenant',
            required: true,
            index: true,
        },
        roomID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
            index: true,
        },

        //info fields
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        type: {
            type: String,
            enum: [PAYMENT_TYPES.CREDIT, PAYMENT_TYPES.DEBIT],
            default: PAYMENT_TYPES.CREDIT,
            required: true,
        },
        method: {
            type: String,
            enum: [PAYMENT_METHODS.CASH, PAYMENT_METHODS.UPI, PAYMENT_METHODS.BANK],
            default: PAYMENT_METHODS.CASH,
            required: true,
        },

        paymentDate: {
            type: Date,
            default: Date.now, // 👈 important
            required: true,
        },

        fromDate: {
            type: Date,
        },

        toDate: {
            type: Date,
        },

        notes: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true, // adds createdAt, updatedAt
    },
);

// // 🔥 Compound indexes for fast queries
// PaymentSchema.index({ tenantId: 1, paymentDate: 1 });
// PaymentSchema.index({ roomId: 1, paymentDate: 1 });
// PaymentSchema.index({ companyId: 1, paymentDate: 1 });

export const PaymentModel = mongoose.model('Payment', paymentSchema);
export type IPayment = mongoose.InferSchemaType<typeof paymentSchema>;
