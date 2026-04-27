// Company Controller

import { formatZodError, throwAppError } from '../../shared/utils/error';
import { RequestHandler } from '../../shared/utils/requestHandler';
import { ResponseHandler } from '../../shared/utils/responseHandler';
import { MapCompanyDTO } from './company.dto';
import { CompanyService } from './company.service';
import { UpdateCompanySchema } from './company.validators';

const get = async (req: any, res: any) => {
    try {
        const ctx = req.context;
        const { id } = req.params;

        if (id?.trim() == '') {
            return throwAppError('Invalid company id', 400);
        }

        const company = await CompanyService.get(id, ctx, { populate: true });

        return ResponseHandler.appResponse(
            res,
            200,
            true,
            'Company retrieved successfully',
            MapCompanyDTO(company, ctx.user.role),
        );
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};

const update = async (req: any, res: any) => {
    // TODO: only update permisisons according to transition map
    try {
        const ctx = req.context;
        const { id } = req.params;

        if (id?.trim() == '') {
            return throwAppError('Invalid company id', 400);
        }
        const { data, success, error } = UpdateCompanySchema.safeParse(req.body);
        if (!success) {
            const validationErrors = formatZodError(error);

            return ResponseHandler.appResponse(res, 400, false, 'Validation Error', {
                fields: validationErrors,
            });
        }

        const company = await CompanyService.update(id, data, ctx);
        if (!company) {
            return throwAppError('Failed to update company', 404);
        }

        return ResponseHandler.appResponse(
            res,
            200,
            true,
            'Company updated successfully',
            MapCompanyDTO(company, ctx.user.role),
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
        const companies = await CompanyService.search(query, ctx, { pagination });
        return ResponseHandler.appResponse(res, 200, true, 'Companies retrieved successfully', companies);
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};

export const CompanyControler = {
    get,
    update,
    search,
};
