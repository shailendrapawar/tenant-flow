// Company Model
// company.model.ts

import mongoose from "mongoose";
import { COMPANY_STATUS } from "./company.constants";

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        ownerID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        logo: {
            url: {
                type: String,
                default: "",
            },
            id: {
                type: String,
                default: "",
            }
        },
        contact: {
            phone: {
                type: String,
                default: ""
            },
            email: {
                type: String,
                default: ""
            }
        },
        settings: {
            type: Object,
            default: {}
        },
        meta: {
            type: Object,
            default: {}
        },
        status: {
            type: String,
            enums: [
                COMPANY_STATUS.ACTIVE,
                COMPANY_STATUS.INACTIVE,
                COMPANY_STATUS.SUSPENDED,
                COMPANY_STATUS.BANNED,
            ],
            default: COMPANY_STATUS.ACTIVE,
        }
    },
    { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);