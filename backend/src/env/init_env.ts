import UpsertPermissions from './migrate-permissions';
import UpsertRoles from './migrate-roles';

export const INIT_SYSTEM_DATA = async () => {
    await UpsertPermissions();
    await UpsertRoles();
};
