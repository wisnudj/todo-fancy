import { Schema, model, Document, Types } from "mongoose"

export interface Task extends Document {
    title: string;
    completed: boolean;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema = new Schema<Task>({
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
})

export const TaskModel = model<Task>("Task", TaskSchema)