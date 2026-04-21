export type User = {
    name: string;
    email: string;
    password: string;
    role: string;
    status: string;
    lastLoginAt: Date;
    loginAttempts: number;
    lockUntil: Date;
    meta: object;
};
