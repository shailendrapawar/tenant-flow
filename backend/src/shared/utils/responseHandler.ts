// const success = (res: any, status: number, message: string, data: any) => {
//     return res.status(status).json({
//         success: true,
//         message,
//         data,
//     });
// };

// const error = (res: any, status: number, message: string, err: any) => {
//     const msg = message || err?.message || 'Internal server error';
//     const statusCode = status || err?.statusCode || 500;

//     return res.status(statusCode).json({
//         success: false,
//         message: msg,
//         statusCode: statusCode,
//         data: err,
//     });
// };

const appResponse = (res: any, status: number, success: boolean, message: string, data: any) => {
    return res.status(status).json({
        success,
        message: message || (success ? 'Request successful' : 'Request failed'),
        data,
    });
};

export const ResponseHandler = {
    // success,
    // error,
    appResponse,
};
