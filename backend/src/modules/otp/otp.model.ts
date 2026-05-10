// Otp Model

import mongoose from "mongoose";
import { OTP_PURPOSES } from "./otp.constants";

const otpSchema = new mongoose.Schema({
    purpose: {
        type: String,
        required: true,
        enum: [OTP_PURPOSES.SIGNUP, OTP_PURPOSES.RESET_PASSWORD]
    },
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    expiry: {
        type: Date,
        reqiured: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    // issuedBy: {
    //     // only for cases of password-reset
    //     type: mongoose.Types.ObjectId,
    //     ref: "User",
    //     default: null
    // }
}, {
    timestamps: true
})

export const OtpModel = mongoose.model("Otp", otpSchema);
export type IOtp = mongoose.InferSchemaType<typeof otpSchema>