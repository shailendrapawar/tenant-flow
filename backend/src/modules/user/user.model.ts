import mongoose from 'mongoose';
import { USER_ROLES, USER_STATUS } from './user.constants';

const defaultUserImage = 'https://as2.ftcdn.net/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.webp';
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
        lastName: {
            type: String,
            //   required: true,
            trim: true,
            maxlength: 50,
        },

        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            default: null,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },

        avatar: {
            url: {
                type: String,
                default: defaultUserImage,
            },
            id: {
                type: String,
                default: '',
            },
        },

        // Account Management
        role: {
            type: String,
            enum: [USER_ROLES.ADMIN, USER_ROLES.LANDLORD, USER_ROLES.TENANT],
            default: USER_ROLES.LANDLORD,
        },

        status: {
            type: String,
            enum: [USER_STATUS.ACTIVE, USER_STATUS.INACTIVE, USER_STATUS.SUSPENDED, USER_STATUS.BANNED],
            default: USER_STATUS.ACTIVE,
        },

        lastLoginAt: {
            type: Date,
            default: null,
        },

        loginAttempts: {
            type: Number,
            default: 0,
        },

        lockUntil: {
            type: Date,
            default: null,
        },

        meta: {
            default: {},
        },
    },
    {
        timestamps: true,
    },
);

export type IUser = mongoose.InferSchemaType<typeof userSchema>;

export const UserModel = mongoose.model('User', userSchema);
