// Company Controller

import { throwAppError } from '../../shared/utils/error';
import { ResponseHandler } from '../../shared/utils/responseHandler';
import { CompanyService } from './company.service';

const get = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        if (id?.trim() == '') {
            return throwAppError('Invalid company id', 400);
        }

        const company = await CompanyService.get(id, { populate: true });

        return ResponseHandler.appResponse(
            res,
            200,
            true,
            'Company retrieved successfully',
            company,
        );
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};

const update = async (req: any, res: any) => {
    const { id } = req.params;

    if (id?.trim() == '') {
        return throwAppError('Invalid company id', 400);
    }
};

export const CompanyControler = {
    // create,
    get,
    update,
};
