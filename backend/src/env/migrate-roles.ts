import { PermissionModel } from '../modules/access-management/permission/permission.model';
import { RoleModel } from '../modules/access-management/role/role.model';
import { SYSTEM_ROLES } from '../modules/access-management/role/role.constants';
import logger from '../shared/utils/logger';

async function createRole(role: any, permissions: any[]) {
    const res = await RoleModel.updateOne(
        { name: role.name },
        {
            $setOnInsert: {
                ...role,
                permissions: permissions,
            },
        },
        { upsert: true },
    );
    return res;
}

const UpsertRoles = async () => {
    //iterate roles
    for (const item of SYSTEM_ROLES) {
        //1:traverse permissions and get doc
        const permissions = await PermissionModel.find({
            name: { $in: item.permissions },
        })
            .select('_id name')
            .lean();

        //only traverse for _id
        const rolePermission = permissions?.map((v: any) => v._id);

        //Create role
        await createRole(item, rolePermission);
    }
    logger.info('✅ All system roles are upserted successfully');
};

export default UpsertRoles;
