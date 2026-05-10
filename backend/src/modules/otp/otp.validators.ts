import z from "zod";
import { OTP_PURPOSES } from "./otp.constants";

// Otp Validators

//CREATE ======================================>
export const CreateOtpPayloadSchema = z.object({
    purpose: z.enum([OTP_PURPOSES.SIGNUP, OTP_PURPOSES.RESET_PASSWORD]),
    email: z.string().email(),
    code: z.string().min(6).max(6),
})

export type ICreateOtpPayload = z.infer<typeof CreateOtpPayloadSchema>

// SEARCH =====================================>
export const SearchOtpQuerySchema = z.object({
    purpose: z.string().optional(),
    email: z.string().optional(),
    code: z.string().optional()
})
export type ISearchOtpQuerySchema = z.infer<typeof SearchOtpQuerySchema>