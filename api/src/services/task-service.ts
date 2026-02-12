import { TaskModel, Task } from "../models/task";

export interface TaskResult {
    limit: number;
    total: number;
    page: number;
    totalPages: number;
    items: Task[]
}

export interface TaskQuery {
    title?: string;
    userId?: string;
    completed?: boolean;
    limit: number;
    page: number;
}

export const getTasks = async(params: TaskQuery): Promise<TaskResult> => {
    const page: number = params.page === 0 ? 1 : params.page;
    const limit: number = params.limit === 0 ? 100: params.limit
    const skip: number = (page - 1) * limit

    const userId = params.userId
    const title = params.title

    const [items, total] = await Promise.all([
        TaskModel.find({ userId, title })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        TaskModel.countDocuments({ userId })
    ])

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        items
    }
}

export const addTask = async(userId: string, title: string): Promise<Task> => {
    return await TaskModel.create({ title, userId })
}