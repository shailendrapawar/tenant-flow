// shared/utils/cookie.utils.ts

import { Response } from 'express';
import ENV from '../configs/app.config';

const COOKIE_CONFIG = {
    httpOnly: true,
    secure: ENV.App.Environment === 'production',
    sameSite: 'strict' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const setAppCookie = (res: Response, key: string, value: string) => {
    res.clearCookie(key, COOKIE_CONFIG);
    res.cookie(key, value, COOKIE_CONFIG);
};

export const clearAppCookie = (res: Response, key: string) => {
    res.clearCookie(key, COOKIE_CONFIG);
};
