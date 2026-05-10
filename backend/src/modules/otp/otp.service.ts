// Otp Service

import { HydratedDocument } from "mongoose";
import { IOtp, OtpModel } from "./otp.model";
import { ICreateOtpPayload, ISearchOtpQuerySchema } from "./otp.validators";
import { RequestContext } from "../../shared/utils/contextBuilder";
import { count } from "node:console";

type OtpDocument = HydratedDocument<IOtp> | null
const populate = [{

}]

const set = () => { }

const CREATE = async (payload: ICreateOtpPayload): Promise<OtpDocument> => {

    //1: search if any exiting otp for same purpose and 
    // const { otps } = await SEARCH({ email: payload.email, purpose: payload.purpose },)

    const newOTP = new OtpModel({
        purpose: payload.purpose,
        email: payload.email,
        //generate these
        // code: 1235,
        // expiry:
    })

    await newOTP.save()
    return newOTP
}
const UPDATE = () => { }
const SEARCH = async (query: ISearchOtpQuerySchema, ctx: RequestContext, options?: any) => {

    let sort: any = {
        timeStamp: -1,
    };
    let where: any = ctx.where() || {};

    if (query.purpose) {
        where.purpose = query.purpose
    }
    if (query.email) {
        where.email = query.email
    }
    if (query.code) {
        where.code = query.code
    }

    const countPromise = OtpModel.countDocuments(where)
    const itemsPromise = OtpModel.find(where)
        // .populate(populate)
        .limit(options?.pagination?.limit)
        .skip(options?.pagination?.skip)
        .sort(sort);
    const [count, otps] = await Promise.all([countPromise, itemsPromise])
    return { count, otps }

}
const GET = () => { }

export const OtpService = {
    create: CREATE,
    update: UPDATE,
    search: SEARCH,
    get: GET,
}
