// Company Constants

export const COMPANY_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
};
export const COMPANY_STATUS_TRANSITION_MAP = {
    [COMPANY_STATUS.ACTIVE]: [COMPANY_STATUS.INACTIVE, COMPANY_STATUS.SUSPENDED, COMPANY_STATUS.BANNED],
    [COMPANY_STATUS.INACTIVE]: [COMPANY_STATUS.ACTIVE, COMPANY_STATUS.SUSPENDED, COMPANY_STATUS.BANNED],
    [COMPANY_STATUS.SUSPENDED]: [COMPANY_STATUS.ACTIVE, COMPANY_STATUS.BANNED],
    [COMPANY_STATUS.BANNED]: []

}
// ===============================================================
// =================COMPANY ENTITY PERMISSIONS====================
export const COMPANY_CREATE = 'company:create';
export const COMPANY_READ = 'company:read';
export const COMPANY_LIST = 'company:list';
export const COMPANY_UPDATE = 'company:update';
export const COMPANY_DELETE = 'company:delete';
export const COMPANY_MANAGE = 'company:manage';

export const COMPANY_PERMISSIONS = [
    { name: COMPANY_CREATE, description: 'Create company' },
    { name: COMPANY_READ, description: 'Read company' },
    { name: COMPANY_LIST, description: 'List companies' },
    { name: COMPANY_UPDATE, description: 'Update company' },
    { name: COMPANY_DELETE, description: 'Delete company' },

    { name: COMPANY_MANAGE, description: 'Manage company' }, //aggregate permission for admin whihc includes sensitive fileds like status
];
