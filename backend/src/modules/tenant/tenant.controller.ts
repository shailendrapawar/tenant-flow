import { CreateTenantPayloadSchema, UpdateTenantPayloadSchema } from './tenant.validators';
import { RequestContext } from '../../shared/utils/contextBuilder';
import { TenantService } from './tenant.service';
import { ResponseHandler } from '../../shared/utils/responseHandler';
import { formatZodError, throwAppError } from '../../shared/utils/error';
import { RequestHandler } from '../../shared/utils/requestHandler';

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

        // 2: call service
        const tennat = await TenantService.create(data, ctx);
        return ResponseHandler.appResponse(res, 201, true, 'Tenants Added successfully', tennat);
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode || 500, false, error?.message, null);
    }
};

const get = async (req: any, res: any) => {
    try {
        const ctx: RequestContext = req.context;

        const { id } = req.params;

        if (id?.trim() == '') {
            return throwAppError('Invalid company id', 400);
        }
        const tenant = await TenantService.get(req.params.id, ctx);
        return ResponseHandler.appResponse(res, 200, true, 'Tenant retrieved successfully', tenant);
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode || 500, false, error?.message, null);
    }
};

const search = async (req: any, res: any) => {
    try {
        const ctx = req.context;
        const query = RequestHandler.parseQuery(req);
        const pagination = RequestHandler.getPagination(req);

        const tenants = await TenantService.search(query, ctx, { pagination })
        return ResponseHandler.appResponse(res, 200, true, 'Tenants retrieved successfully', tenants);

    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};
const update = async (req: any, res: any) => {
    try {

        const ctx = req.context;
        const { id } = req.params;

        if (id?.trim() == '') {
            return throwAppError('Invalid property id', 400);
        }

        const { data, success, error } = UpdateTenantPayloadSchema.safeParse(req.body);

        if (!success) {
            const validationErrors = formatZodError(error);

            return ResponseHandler.appResponse(res, 400, false, 'Validation Error', {
                fields: validationErrors,
            });
        }

        const tenant = await TenantService.update(id, data, ctx)
        return ResponseHandler.appResponse(
            res,
            200,
            true,
            'Tenant updated successfully',
            tenant
        );

    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};

export const TenantController = {
    create,
    get,
    search,
    update,
};
