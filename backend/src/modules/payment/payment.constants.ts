// Payment Constants
export const PAYMENT_TYPES = {
    CREDIT: 'credit',
    DEBIT: 'debit',
};
export const PAYMENT_METHODS = {
    CASH: 'cash',
    UPI: 'upi',
    BANK: 'bank',
};


// ===============================================================
// =================PAYMENTS ENTITY PERMISSIONS====================

export const PAYMENT_CREATE = 'payment:create';
export const PAYMENT_READ = 'payments:read';
export const PAYMENT_LIST = 'payment:list';
export const PAYMENT_UPDATE = 'payment:update';
export const PAYMENT_DELETE = 'payment:delete'
export const PAYMENT_MANAGE = 'payment:manage';

export const PAYMENT_PERMISSIONS = [
    { name: PAYMENT_CREATE, description: 'Create payment' },
    { name: PAYMENT_READ, description: 'Read payment' },
    { name: PAYMENT_LIST, description: 'List payment' },
    { name: PAYMENT_UPDATE, description: 'Update payment' },
    { name: PAYMENT_DELETE, description: 'Delete payment' },

    { name: PAYMENT_MANAGE, description: 'Manage payment' },

]