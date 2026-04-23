// Company Service

import { HydratedDocument } from 'mongoose';
import { CompanyModel, ICompany } from './company.model';
import { CreateCompanyPayload } from './company.types';
import { USER_ROLES } from '../user/user.constants';

type CompanyDocument = HydratedDocument<ICompany> | null;
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
        query = query.populate(options.populate);
    }

    const company = await query;
    return company;
};

const SEARCH = () => {};
const UPDATE = () => {};

export const CompanyService = {
    create: CREATE,
    get: GET,
    search: SEARCH,
    update: UPDATE,
};
