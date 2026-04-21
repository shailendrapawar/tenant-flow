export const success = (
    res: any,
    status: number,
    message: string,
    data: any,
) => {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
};

export const error = (res: any, status: number, message: string, err: any) => {
    const m = message || err.message;
    return res.status(status).json({
        success: false,
        message: m,
        error: err instanceof Error ? err.message : err,
    });
};

export const ResponseHandler = {
    success,
    error,
};
