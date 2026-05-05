// Payment Service

import { HydratedDocument } from 'mongoose';
import { IPayment, PaymentModel } from './payment.model';
import { RequestContext } from '../../shared/utils/contextBuilder';
import { CreatePaymentPayloadType, SearchPaymentsQueryType, UpdatePaymentPayloadType } from './payment.validators';
import { TenantService } from '../tenant/tenant.service';
import { isObjectID } from '../../shared/utils/strings';
import { throwAppError } from '../../shared/utils/error';
import { USER_ROLES } from '../user/user.constants';
import { PAYMENT_MANAGE } from './payment.constants';
type PaymentDocument = HydratedDocument<IPayment> | null;
const populate = [
    {
        path: 'roomID',
        select: 'roomNumber',
    },
    {
        path: 'tenantID',
        select: 'firstName lastName email phoneNumber',
    },
];

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
    //return invalid
    if (!query) return null;

    // if already a document, return as is
    if (query?._doc) return query;

    let entity = null;
    const where: any = ctx.where();

    if (isObjectID(query)) {
        where._id = query;
        entity = PaymentModel.findOne(where);
    }

    if (entity != null) {
        if (options?.populate) {
            entity = entity.populate(populate);
        }
    }

    entity = await entity;
    return entity;
};

const SEARCH = async (query: SearchPaymentsQueryType, ctx: RequestContext, options?: any) => {
    let sort: any = {
        timeStamp: -1,
    };

    let where: any = ctx.where();

    if (query.companyID && ctx.hasAllPermissions([PAYMENT_MANAGE])) {
        //only override if admin
        where.companyID = query.companyID
    }
    if (query.tenantID) {
        where.companyID = query.companyID
    }
    if (query.roomID) {
        where.roomID = query.roomID
    }

    if (query.amount) {
        where.amount = query.amount
    }
    if (query.type) {
        where.type = query.type
    }
    if (query.method) {
        where.method = query.method
    }
    if (query.fromDate) {
        where.fromDate = query.fromDate
    }
    if (query.toDate) {
        where.toDate = query.toDate
    }

    const countPromise = PaymentModel.countDocuments(where);
    const itemsPromise = PaymentModel.find(where)
        .populate(populate)
        .limit(options?.pagination?.limit)
        .skip(options?.pagination?.skip)
        .sort(sort);

    const [count, payments] = await Promise.all([countPromise, itemsPromise]);
    return { count, payments };

};

const UPDATE = async (id: string, model: UpdatePaymentPayloadType, ctx: RequestContext) => {
    let entity = await GET(id, ctx, { populate: true });

    if (!entity) {
        return throwAppError('Payment not found', 404);
    }

    entity = await set(model, entity, ctx);

    await entity.save();

    return entity;
};

export const PaymentService = {
    create: CREATE,
    update: UPDATE,
    search: SEARCH,
    get: GET,
};
