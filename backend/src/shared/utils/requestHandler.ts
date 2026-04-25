const parseQuery = (req: any) => {
    let query: Record<string, any> = {};

    Object.entries(req.query).forEach(([key, value]) => {
        query[key] = value;
    });

    return query;
};

const getPagination = (req: any) => {
    return {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        skip: ((req.query.page || 1) - 1) * (req.query.limit || 10),
    };
};

export const RequestHandler = {
    parseQuery,
    getPagination,
};
