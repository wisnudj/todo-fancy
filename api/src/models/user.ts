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
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        maxLength: 255
    },
}, {
    timestamps: true,
})

export const UserModel = model<User>("User", UserSchema)