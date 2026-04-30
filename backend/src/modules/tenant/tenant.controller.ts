import { CreateTenantPayloadSchema } from './tenant.validators';
import { RequestContext } from '../../shared/utils/contextBuilder';
import { TenantService } from './tenant.service';
import { ResponseHandler } from '../../shared/utils/responseHandler';
import { formatZodError, throwAppError } from '../../shared/utils/error';

const create = async (req: any, res: any) => {
    try {
        const ctx: RequestContext = req.context;

        //1: payload validation
        const { success, data, error } = CreateTenantPayloadSchema.safeParse(req.body);

        if (!success) {
            const validationErrors = formatZodError(error);

            return ResponseHandler.appResponse(res, 400, false, 'Validation Error', {
                fields: validationErrors,
            });
        }

        const tennat = await TenantService.create(data, ctx);
        return ResponseHandler.appResponse(res, 201, true, 'Tenants Added successfully', tennat);
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode || 500, false, error?.message, null);
    }
};
const get = async (req: any, res: any) => {};
const search = async (req: any, res: any) => {};
const update = async (req: any, res: any) => {};

export const TenantController = {
    create,
    get,
    search,
    update,
};
