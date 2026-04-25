// Role Service

import { RequestContext } from '../../../shared/utils/contextBuilder';
import mongoose, { HydratedDocument } from 'mongoose';
import { throwAppError } from '../../../shared/utils/error';
import { IRole, RoleModel } from './role.model';
type RoleDocument = HydratedDocument<IRole>;
const populate = [{ path: 'permissions', select: 'name description' }];

const SEARCH = async () => { };
const CREATE = async () => { };

const GET = async (id: string, ctx: RequestContext, options?: any): Promise<RoleDocument | null> => {
    let query = null;

    if (mongoose.isValidObjectId(id)) {
        query = RoleModel.findById(id);
    } else {
        query = RoleModel.findOne({ name: id });
    }

    if (options?.populate) {
        query = query.populate(populate);
    }

    const role = await query;
    if (!role) {
        return throwAppError('Role not found', 404);
    }
    
    return role;
};
const UPDATE = async () => { };
const DELETE = async () => { };

export const RoleService = {
    search: SEARCH,
    create: CREATE,
    get: GET,
    update: UPDATE,
    delete: DELETE,
};
