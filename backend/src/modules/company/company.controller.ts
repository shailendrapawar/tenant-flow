// Company Controller

import { throwAppError } from '../../shared/utils/error';
import { RequestHandler } from '../../shared/utils/requestHandler';
import { ResponseHandler } from '../../shared/utils/responseHandler';
import { CompanyService } from './company.service';

const get = async (req: any, res: any) => {
    try {
        const ctx = req.context;
        const { id } = req.params;

        if (id?.trim() == '') {
            return throwAppError('Invalid company id', 400);
        }

        const company = await CompanyService.get(id, ctx, { populate: true });

        return ResponseHandler.appResponse(res, 200, true, 'Company retrieved successfully', company);
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};

const update = async (req: any, res: any) => {
    try {
        const ctx = req.context;
        const { id } = req.params;

        if (id?.trim() == '') {
            return throwAppError('Invalid company id', 400);
        }
        const company = await CompanyService.update(id, req.body, ctx);
        if (!company) {
            return throwAppError('Failed to update company', 404);
        }

        // TODO: map before sending data
        return ResponseHandler.appResponse(res, 200, true, 'Company updated successfully', company);
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
    // create,
    get,
    update,
    search,
};
