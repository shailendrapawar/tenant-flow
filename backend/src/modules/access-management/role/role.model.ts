// Role Model
import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true, // admin, landlord, etc.
        },

        permissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Permission',
            },
        ],

        description: {
            type: String,
            default: '',
        },

        isSystem: {
            type: Boolean,
            default: true, // seeded roles like admin/landlord
        },
    },
    { timestamps: true },
);

export type IRole = mongoose.InferSchemaType<typeof RoleSchema>;

export const RoleModel = mongoose.model<IRole>('Role', RoleSchema);
