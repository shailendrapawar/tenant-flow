import jwt from 'jsonwebtoken';
import ENV from '../configs/app.config';

export const generateAcessToken = (data: any) => {
    const token = jwt.sign(
        {
            ...data,
        },
        ENV.JWT.Secret,
        { expiresIn: `1d` },
    );
    return token;
};

export const verifyAccessToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, ENV.JWT.Secret);
        return decoded;
    } catch (error) {
        return null;
    }
};
