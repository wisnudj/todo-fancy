import { TaskModel, Task } from "../models/task";

export interface TaskPagination {
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

export interface TaskItem {
    id: string;
    title: string;
    completed: boolean;
    updatedAt: Date;
}

export interface UpdateTaskParam {
    id: string;
    userId: string;
    title?: string;
    completed?: boolean;
}

export const getTasks = async(query: TaskQuery): Promise<TaskPagination> => {
    const { page, limit, userId, title } = query
    const skip: number = (page - 1) * limit

    const filter: any = {}

    if(userId) filter.userId = userId

    if(title) {
        filter.title = { $regex: title, $options: "i" }
    }

    const [items, total = 0] = await Promise.all([
        TaskModel.find(filter)
            .select("-__v -userId")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        TaskModel.countDocuments(filter)
    ])

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit)

    return {
        limit: limit,
        total: total,
        page: page,
        totalPages: totalPages,
        items: items
    }
}

export const addTask = async(userId: string, title: string): Promise<TaskItem> => {
    const task = await TaskModel.create({ title, userId })
    return { id: task._id.toString(), title: task.title, completed: task.completed, updatedAt: task.updatedAt }
}

export const updateTask = async(param: UpdateTaskParam): Promise<TaskItem> => {
    const { id, userId, title, completed } = param

    const update: any = {}
    if(title) update.title = title
    if(completed) update.completed = title

    const updated = await TaskModel.findOneAndUpdate(
        { _id: id, userId },
        { $set: update },
        { new: true, runValidators: true }
    )

    if(!updated) throw new Error("TASK_NOT_FOUND")

    return { id: updated._id.toString(), title: updated.title, completed: updated.completed, updatedAt: updated.updatedAt }
}