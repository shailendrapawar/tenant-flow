// Role Controller
import { ResponseHandler } from '../../../shared/utils/responseHandler';
import { RoleService } from './role.service';

const get = async (req: any, res: any) => {
    try {
        const ctx = req.context;
        const { id } = req.params;

        const role = await RoleService.get(id, ctx, { populate: true });

        return ResponseHandler.appResponse(res, 200, true, 'Role retrieved successfully', role);
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};

export const RoleController = {
    get,
};
