import { PermissionModel } from '../modules/access-management/permission/permission.model';
import { PERMISSIONS } from '../modules/access-management/permission/permission.constants';
import logger from '../shared/utils/logger';

const UpsertPermissions = async () => {
    const promise = [];
    for (let perm of PERMISSIONS) {
        promise.push(PermissionModel.updateOne({ name: perm?.name }, { $set: perm }, { upsert: true }));
    }
    await Promise.all(promise);

    logger.info('✅ Permissions upserted successfully');
};

export default UpsertPermissions;
