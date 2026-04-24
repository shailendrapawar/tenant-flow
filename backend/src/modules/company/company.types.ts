// Company Types

export type CreateCompanyPayload = {
    ownerID: string;
    companyNamePrefix: string;
    ownerEmail: string;
};

export type UpdateCompanyPayload = {
    name?: string;
    contact?: {
        phone?: string;
        email?: string;
    };
    status?: string;
    location?: {
        addressLine1?: string;
        addressLine2?: string;
        city?: string;
        state?: string;
        district?: string;
        country?: string;
        postalCode?: string;
    };
    settings?: {
        //can contain themes etc's further
        type: Object;
        default: {};
    };
};
