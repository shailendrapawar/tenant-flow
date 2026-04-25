// Role Constants

import { COMPANY_CREATE, COMPANY_MANAGE, COMPANY_READ, COMPANY_UPDATE } from '../../company/company.constants';
import { USER_MANAGE, USER_ROLES } from '../../user/user.constants';

// =========================================
//=========ROLE ENTITY DATA=================

export const SYSTEM_ROLES = [
    {
        name: USER_ROLES.ADMIN,
        permissions: [USER_MANAGE, COMPANY_MANAGE],
        description: 'System administrator with full access',
        isSystem: true,
    },

    {
        name: USER_ROLES.LANDLORD,
        permissions: [
            //company permissions
            COMPANY_CREATE,
            COMPANY_READ,
            COMPANY_UPDATE,
        ],
        description: 'Property landlord with limited access',
        isSystem: true,
    },
];
