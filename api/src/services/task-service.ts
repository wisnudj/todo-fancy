import sanitizeHtml from 'sanitize-html';

import { TaskModel, Task } from "../models/task";

export interface TaskPagination {
    limit: number;
    total: number;
    totalCompletedTask: number;
    totalActiveTask: number;
    page: number;
    totalPages: number;
    items: TaskItem[]
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
    title?: string | undefined;
    completed?: boolean | undefined;
}

function sanitizePlainText(value: string): string {
    return sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
    }).trim();
}

export const getTasks = async(query: TaskQuery): Promise<TaskPagination> => {
    const { page, limit, userId, title } = query
    const skip: number = (page - 1) * limit

    const filter: any = {}

    if(userId) filter.userId = userId

    if(title) {
        filter.title = { $regex: title, $options: "i" }
    }

    const [items, totalTask = 0, totalCompletedTask = 0] = await Promise.all([
        TaskModel.find(filter)
            .select("-__v -userId")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        TaskModel.countDocuments(filter),
        TaskModel.countDocuments({...filter, completed: true})
    ])

    const taskItems: TaskItem[] = items.map((el: Task) => {
        return { id: el._id.toString(), title: el.title, completed: el.completed, updatedAt: el.updatedAt }
    })

    const totalPages = totalTask === 0 ? 0 : Math.ceil(totalTask / limit)
    const totalActiveTask = totalTask - totalCompletedTask

    return {
        limit: limit,
        total: totalTask,
        totalCompletedTask: totalCompletedTask,
        totalActiveTask: totalActiveTask,
        page: page,
        totalPages: totalPages,
        items: taskItems
    }
}

export const addTask = async(userId: string, title: string): Promise<TaskItem> => {
    const sanitizeTitle: string = sanitizePlainText(title)
    const task = await TaskModel.create({ title: sanitizeTitle, userId })
    return { id: task._id.toString(), title: task.title, completed: task.completed, updatedAt: task.updatedAt }
}

export const updateTask = async(param: UpdateTaskParam): Promise<TaskItem> => {
    const { id, userId, title, completed } = param

    const update: any = {}
    if(title !== undefined) update.title = title
    if(completed !== undefined) update.completed = completed

    const updated = await TaskModel.findOneAndUpdate(
        { _id: id, userId },
        { $set: update },
        { new: true, runValidators: true }
    )

    if(!updated) throw new Error("TASK_NOT_FOUND")

    return { id: updated._id.toString(), title: updated.title, completed: updated.completed, updatedAt: updated.updatedAt }
}