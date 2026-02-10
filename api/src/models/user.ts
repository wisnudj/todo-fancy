import { Schema, model, Document } from "mongoose"

export interface User extends Document {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<User>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

export const UserModel = model<User>("User", UserSchema)