// Company Service

import { HydratedDocument } from 'mongoose';
import { CompanyModel, ICompany } from './company.model';
import { CreateCompanyPayload } from './company.types';
import { USER_ROLES } from '../user/user.constants';
import { throwAppError } from '../../shared/utils/error';

type CompanyDocument = HydratedDocument<ICompany> | null;
const populate = [{ path: 'owner', select: 'email' }];
// ====================================
// ============ export methods ============
const CREATE = async (payload: CreateCompanyPayload): Promise<CompanyDocument> => {
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

const GET = async (id: string, options?: any): Promise<CompanyDocument> => {
    let query = null;

    if (options?.role == USER_ROLES.ADMIN) {
        query = CompanyModel.findById({ _id: id });
    } else {
        query = CompanyModel.findOne({ owner: id });
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

const SEARCH = () => {};
const UPDATE = (id: string, model: any) => {};

export const CompanyService = {
    create: CREATE,
    get: GET,
    search: SEARCH,
    update: UPDATE,
};
