// Payment Service

import { HydratedDocument } from 'mongoose';
import { IPayment, PaymentModel } from './payment.model';
import { RequestContext } from '../../shared/utils/contextBuilder';
import { CreatePaymentPayloadType } from './payment.validators';
import { TenantService } from '../tenant/tenant.service';
type PaymentDocument = HydratedDocument<IPayment> | null;
const populate = [];

const set = async (
    model: any,
    entity: HydratedDocument<IPayment>,
    ctx: RequestContext,
): Promise<HydratedDocument<IPayment>> => {
    if (model.amount) {
        entity.amount = model.amount;
    }
    if (model.type) {
        entity.type = model.type;
    }
    if (model.method) {
        entity.method = model.method;
    }
    if (model.paymentDate) {
        entity.paymentDate = new Date(model.paymentDate);
    }
    if (model.fromDate) {
        entity.fromDate = new Date(model.fromDate);
    }
    if (model.toDate) {
        entity.toDate = new Date(model.toDate);
    }
    if (model.notes) {
        entity.notes = model.notes;
    }
    return entity;
};

const CREATE = async (payload: CreatePaymentPayloadType, ctx: RequestContext): Promise<PaymentDocument> => {
    const user = ctx.user;
    const companyID = user?.companyID;

    const tenant = await TenantService.get(payload.tenantID, ctx, { populate: true });

    let newPayment = new PaymentModel({
        companyID: companyID,
        tenantID: tenant?._id,
        roomID: tenant?.roomID?._id,
    });

    newPayment = await set(payload, newPayment, ctx);
    newPayment = await newPayment.save();
    return newPayment;
};

const GET = async (query: any, ctx: RequestContext, options?: any): Promise<PaymentDocument> => {
    return null;
};

const SEARCH = async (query: any, ctx: RequestContext, options?: any) => {};

const UPDATE = async (id: string, model: any, ctx: RequestContext) => {};

export const PaymentService = {
    create: CREATE,
    update: UPDATE,
    search: SEARCH,
    get: GET,
};
