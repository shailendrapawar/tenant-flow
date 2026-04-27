// Property Controller

import { RequestContext } from '../../shared/utils/contextBuilder';
import { formatZodError, throwAppError } from '../../shared/utils/error';
import { RequestHandler } from '../../shared/utils/requestHandler';
import { ResponseHandler } from '../../shared/utils/responseHandler';
import { MapPropertyDTO } from './property.dto';
import { PropertyService } from './property.service';
import { CreatePropertySchema, UpdatePropertySchema } from './property.validators';

const create = async (req: any, res: any) => {
    try {
        const ctx: RequestContext = req.context;
        const { success, data, error } = CreatePropertySchema.safeParse(req.body);

        if (!success) {
            const validationErrors = formatZodError(error);

            return ResponseHandler.appResponse(res, 400, false, 'Validation Error', {
                fields: validationErrors,
            });
        }

        const property = await PropertyService.create(data, ctx);

        return ResponseHandler.appResponse(
            res,
            201,
            true,
            'Property created successfully',
            MapPropertyDTO(property, ctx?.user?.role),
        );
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};

const get = async (req: any, res: any) => {
    try {
        const ctx = req.context;
        const { id } = req.params;

        if (id?.trim() == '') {
            return throwAppError('Invalid property id', 400);
        }

        const property = await PropertyService.get(id, ctx, { populate: true });
        return ResponseHandler.appResponse(
            res,
            200,
            true,
            'Property retrieved successfully',
            MapPropertyDTO(property, ctx?.user?.role),
        );
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};

const search = async (req: any, res: any) => {
    try {
        const ctx = req.context;
        const query = RequestHandler.parseQuery(req);
        const pagination = RequestHandler.getPagination(req);
        const properties = await PropertyService.search(query, ctx, { pagination });
        return ResponseHandler.appResponse(res, 200, true, 'Properties retrieved successfully', properties);
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

        const { data, success, error } = UpdatePropertySchema.safeParse(req.body);

        if (!success) {
            const validationErrors = formatZodError(error);

            return ResponseHandler.appResponse(res, 400, false, 'Validation Error', {
                fields: validationErrors,
            });
        }

        const property = await PropertyService.update(id, data, ctx);
        return ResponseHandler.appResponse(
            res,
            200,
            true,
            'Property updated successfully',
            MapPropertyDTO(property, ctx?.user?.role),
        );
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};

export const PropertyController = {
    create,
    get,
    search,
    update,
};
