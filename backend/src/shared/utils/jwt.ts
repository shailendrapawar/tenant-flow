import jwt from 'jsonwebtoken';
import ENV from '../configs/app.config';

export const generateToken = (user: any) => {
    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role,
        },
        ENV.JWT.Secret,
        { expiresIn: `1d` },
    );
    return token;
};
