// Payment Controller

import { RequestContext } from '../../shared/utils/contextBuilder';
import { formatZodError } from '../../shared/utils/error';
import { ResponseHandler } from '../../shared/utils/responseHandler';
import { PaymentService } from './payment.service';
import { CreatePaymentPayloadSchema } from './payment.validators';

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

export const PaymentController = {
    create,
};
