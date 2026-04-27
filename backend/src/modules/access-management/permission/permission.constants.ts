// Permission Constants
import { COMPANY_PERMISSIONS } from '../../company/company.constants';
import { PROPERTY_PERMISSIONS } from '../../property/property.constants';
import { USER_PERMISSIONS } from '../../user/user.constants';

export const PERMISSIONS = [...USER_PERMISSIONS, ...COMPANY_PERMISSIONS, ...PROPERTY_PERMISSIONS];
