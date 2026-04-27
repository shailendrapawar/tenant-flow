// Company Service

import { HydratedDocument } from 'mongoose';
import { CompanyModel, ICompany } from './company.model';
import { CreateCompanyPayload, UpdateCompanyPayload } from './company.types';
import { USER_ROLES } from '../user/user.constants';
import { throwAppError } from '../../shared/utils/error';
import { RequestContext } from '../../shared/utils/contextBuilder';
import { COMPANY_MANAGE } from './company.constants';
import { UpdateCompanySchema } from './company.validators';

type CompanyDocument = HydratedDocument<ICompany> | null;
const populate = [{ path: 'owner', select: 'email' }];
// ====================================
// ============ export methods ============

const set = async (
    model: UpdateCompanySchema,
    entity: HydratedDocument<ICompany>,
    ctx: RequestContext,
): Promise<CompanyDocument> => {
    if (model.name) {
        entity.name = model.name;
    }
    if (model.contact) {
        // FIXME: later this isnt required coz,
        // user would be poopulated or caretaker number would be added
        if (model.contact.email && entity.contact) {
            entity.contact.email = model.contact.email;
        }
        if (model.contact.phone && entity.contact) {
            entity.contact.phone = model.contact.phone;
        }
    }

    if (model.location) {
        entity.location = model.location;
    }

    if (model.status) {
        if (!ctx.hasAllPermissions([COMPANY_MANAGE])) {
            //throw error if not admin
            // TODO: also add journal who dare to do this shit
            return throwAppError('forbidden', 403);
        }
        entity.status = model.status;
    }

    if (model.settings) {
        entity.settings = model.settings;
    }

    return entity;
};
const CREATE = async (payload: CreateCompanyPayload, ctx: RequestContext): Promise<CompanyDocument> => {
    const newCompany = new CompanyModel({
        name: payload.companyNamePrefix?.toUpperCase() + ' Accomodations',
        owner: payload.ownerID,
        contact: {
            email: payload.ownerEmail,
        },
    });

    const company = await newCompany.save();
    if (!company) {
        return throwAppError('Company not created', 500);
    }
    return company;
};

const GET = async (id: string, ctx: RequestContext, options?: any): Promise<CompanyDocument> => {
    let query = null;
    const user = ctx.user;

    if (user?.role == USER_ROLES.ADMIN) {
        query = CompanyModel.findById({ _id: id });
    } else {
        //other user else than admin add ownership here
        query = CompanyModel.findOne({ owner: user?._id, _id: id });
    }

    if (options?.populate) {
        query = query.populate(populate);
    }

    const company = await query;

    if (!company) {
        return throwAppError('Company not found', 404);
    }
    return company;
};

const SEARCH = async (query: any, ctx: RequestContext, options?: any) => {
    let sort: any = {
        timeStamp: -1,
    };
    let where: any = {};

    if (query.owner) {
        where.owner = query.owner;
    }

    if (query.name) {
        where.name = { $regex: query.name, $options: 'i' };
    }

    if (query.status) {
        where.status = query.status;
    }

    const countPromise = CompanyModel.countDocuments(where);
    const itemsPromise = CompanyModel.find(where)
        .populate(populate)
        .limit(options?.pagination?.limit)
        .skip(options?.pagination?.skip)
        .sort(sort);
    const [count, companies] = await Promise.all([countPromise, itemsPromise]);
    return { count, companies };
};

const UPDATE = async (id: string, model: UpdateCompanySchema, ctx: RequestContext): Promise<CompanyDocument> => {
    let entity = await GET(id, ctx);

    if (!entity) {
        return throwAppError('Company not found', 404);
    }

    entity = await set(model, entity, ctx);
    await entity?.save();

    //perform any side-effects here
    return entity;
};

export const CompanyService = {
    create: CREATE,
    get: GET,
    search: SEARCH,
    update: UPDATE,
};
