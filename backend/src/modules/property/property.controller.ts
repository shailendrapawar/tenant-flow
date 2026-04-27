// Property Controller

import { RequestContext } from '../../shared/utils/contextBuilder';
import { formatZodError } from '../../shared/utils/error';
import { ResponseHandler } from '../../shared/utils/responseHandler';
import { MapPropertyDTO } from './property.dto';
import { PropertyService } from './property.service';
import { createPropertySchema } from './property.validators';

const create = async (req: any, res: any) => {
    try {
        const ctx: RequestContext = req.context;
        const { success, data, error } = createPropertySchema.safeParse(req.body);

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

export const PropertyController = {
    create,
};
