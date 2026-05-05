// Payment Controller

import { RequestContext } from '../../shared/utils/contextBuilder';
import { formatZodError, throwAppError } from '../../shared/utils/error';
import { ResponseHandler } from '../../shared/utils/responseHandler';
import { isObjectID } from '../../shared/utils/strings';
import { PaymentService } from './payment.service';
import { CreatePaymentPayloadSchema, UpdatePaymentPayloadSchema } from './payment.validators';

const create = async (req: any, res: any) => {
    try {
        const ctx: RequestContext = req.context;
        //1: payload validation
        const { success, data, error } = CreatePaymentPayloadSchema.safeParse(req.body);
        if (!success) {
            const validationErrors = formatZodError(error);

            return ResponseHandler.appResponse(res, 400, false, 'Validation Error', {
                fields: validationErrors,
            });
        }
        const payment = await PaymentService.create(data, ctx);
        return ResponseHandler.appResponse(res, 201, true, 'Payment created successfully', payment);
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode || 500, false, error?.message, null);
    }
};

const get = async (req: any, res: any) => {
    try {
        const ctx: RequestContext = req.context;

        const { id } = req.params;

        if (!isObjectID(id)) {
            return throwAppError('Invalid payment id', 400);
        }
        const payment = await PaymentService.get(id, ctx, { populate: true });
        if (!payment) {
            throwAppError('Payment not found', 404);
        }
        return ResponseHandler.appResponse(res, 200, true, 'Payment retrieved successfully', payment);
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode || 500, false, error?.message, null);
    }
};

const update = async (req: any, res: any) => {
    try {
        const ctx = req.context;
        const { id } = req.params;

        if (!isObjectID(id)) {
            return throwAppError('Invalid payment id', 400);
        }

        const { data, success, error } = UpdatePaymentPayloadSchema.safeParse(req.body);

        if (!success) {
            const validationErrors = formatZodError(error);

            return ResponseHandler.appResponse(res, 400, false, 'Validation Error', {
                fields: validationErrors,
            });
        }
        const payment = await PaymentService.update(id, data, ctx);
        return ResponseHandler.appResponse(res, 200, true, 'Payment updated successfully', payment);
    } catch (error: any) {
        return ResponseHandler.appResponse(res, error?.statusCode || 500, false, error?.message, null);
    }
};

export const PaymentController = {
    create,
    get,
    update,
};
