// Role Constants

import { COMPANY_CREATE, COMPANY_MANAGE, COMPANY_READ, COMPANY_UPDATE } from '../../company/company.constants';
import {
    PROPERTY_CREATE,
    PROPERTY_DELETE,
    PROPERTY_MANAGE,
    PROPERTY_READ,
    PROPERTY_UPDATE,
} from '../../property/property.constants';
import { ROOM_CREATE, ROOM_DELETE, ROOM_MANAGE, ROOM_READ, ROOM_UPDATE } from '../../room/room.constants';
import { TENANT_CREATE, TENANT_LIST, TENANT_MANAGE, TENANT_READ, TENANT_UPDATE } from '../../tenant/tenant.constants';
import { USER_MANAGE, USER_ROLES } from '../../user/user.constants';

// =========================================
//=========ROLE ENTITY DATA=================

export const SYSTEM_ROLES = [
    {
        //admin role
        name: USER_ROLES.ADMIN,
        permissions: [USER_MANAGE, COMPANY_MANAGE, PROPERTY_MANAGE, TENANT_MANAGE, ROOM_MANAGE],
        description: 'System administrator with full access',
        isSystem: true,
    },

    {
        //landlord role
        name: USER_ROLES.LANDLORD,
        permissions: [
            //company permissions
            COMPANY_CREATE,
            COMPANY_READ,
            COMPANY_UPDATE,

            //property permissions
            PROPERTY_CREATE,
            PROPERTY_READ,
            PROPERTY_UPDATE,

            //tenant_permissions
            TENANT_CREATE,
            TENANT_READ,
            TENANT_LIST,
            TENANT_UPDATE,

            //room_permissions
            ROOM_CREATE,
            ROOM_READ,
            ROOM_UPDATE,
            ROOM_DELETE,
        ],
        description: 'Property landlord with limited access',
        isSystem: true,
    },
];
