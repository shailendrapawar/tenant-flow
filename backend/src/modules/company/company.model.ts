// Company Model
// company.model.ts

import mongoose from 'mongoose';
import { COMPANY_STATUS } from './company.constants';

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        logo: {
            url: {
                type: String,
                default: '',
            },
            id: {
                type: String,
                default: '',
            },
        },
        contact: {
            phone: {
                type: String,
                default: '',
            },
            email: {
                type: String,
                default: '',
            },
        },
        status: {
            type: String,
            enum: [
                COMPANY_STATUS.ACTIVE,
                COMPANY_STATUS.INACTIVE,
                COMPANY_STATUS.SUSPENDED,
                COMPANY_STATUS.BANNED,
            ],
            default: COMPANY_STATUS.ACTIVE,
        },
        location: {
            addressLine1: String,
            addressLine2: String,
            city: String,
            state: String,
            district: String,
            country: String,
            postalCode: String,
        },
        settings: {
            //can contain themes etc's further
            type: Object,
            default: {},
        },

        meta: {
            //can contain additional metadata like account status messages
            type: Object,
            default: {},
        },
    },
    { timestamps: true },
);

export const CompanyModel = mongoose.model('Company', companySchema);
export type ICompany = mongoose.InferSchemaType<typeof companySchema>;
