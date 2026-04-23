// Company Controller

import { ResponseHandler } from '../../shared/utils/responseHandler';

const create = async (req: any, res: any) => {
    try {
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode, false, error?.message, null);
    }
};

export const CompanyControler = {
    // create,
};
