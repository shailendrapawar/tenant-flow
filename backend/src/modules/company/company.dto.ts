// Company DTO

import { HydratedDocument } from "mongoose";
import { USER_ROLES } from "../user/user.constants";
import { ICompany } from "./company.model";

const Admin_companyDTO = (company: HydratedDocument<ICompany>) => ({
    ...company?.toObject()
})

const Private_companyDTO = (company: HydratedDocument<ICompany>) => ({
    name: company.name,
    logo: company.logo,
    contact: company.contact,
    status: company.status,
    location: company.location
})

const Public_companyDTO = (company: HydratedDocument<ICompany>) => ({
    name: company.name,
    owner: company.owner,
    logo: company.logo,
    contact: company.contact,
    location: company.location
})


export const MapCompanyDTO = (data: any, key?: string) => {
    const map = {
        [USER_ROLES.ADMIN]: Admin_companyDTO,
        [USER_ROLES.LANDLORD]: Private_companyDTO,
        [USER_ROLES.TENANT]: Public_companyDTO,
        // add other special cases only when necessary
    };

    const dtoFunction = key ? map[key] : map['auth'];
    if (!dtoFunction) {
        throw new Error(`No DTO function found for key: ${key}`);
    }
    const mappedData = dtoFunction(data);
    return mappedData;
};