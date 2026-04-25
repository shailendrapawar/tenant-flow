// Permission Model

import mongoose from 'mongoose';

const PermissionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true, // e.g. "company:create"
            index: true,
        },

        resource: {
            type: String,
            required: true, // e.g. "company"
            index: true,
        },

        action: {
            type: String,
            required: true, // create | read | list | update | delete
            index: true,
        },

        description: {
            type: String,
            default: '',
        },

        isSystem: {
            type: Boolean,
            default: true, // seeded permissions = true
        },
    },
    { timestamps: true },
);

PermissionSchema.index({ resource: 1, action: 1 }, { unique: true });

export const PermissionModel = mongoose.model('Permission', PermissionSchema);
export type IPermission = mongoose.InferSchemaType<typeof PermissionSchema>;
