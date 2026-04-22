export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
    status: string;
    lastLoginAt: Date;
    loginAttempts: number;
    lockUntil: Date;
    meta: object;
    createdAt: Date;
    updatedAt: Date;
};
