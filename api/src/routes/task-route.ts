import { Router } from "express"
import type { Request, Response } from "express"

import passport from "../passport"
import { addTask, getTasks, TaskPagination, updateTask } from "../services/task-service"
import { TaskAddSchema, TaskParamIdSchema, TaskQuerySchema, TaskUpdateSchema } from "../validations/task-schema"

const router = Router()

router.get("/", passport.authenticate("bearer", { session: false, failWithError: true }), async(req: Request, res: Response) => {
    const { limit, page, title, completed } = await TaskQuerySchema.parseAsync(req.query)
    const user = req.user as { id: string }
    const tasks: TaskPagination = await getTasks({ limit, page, title, completed, userId: user.id })
    return res.status(200).json(tasks)
})

router.post("/", passport.authenticate("bearer", { session: false, failWithError: true }), async(req: Request, res: Response) => {
    const { title } = await TaskAddSchema.parseAsync(req.body)
    const user = req.user as { id: string }
    const task = await addTask(user.id, title)
    return res.status(201).json(task)
})

router.patch("/:id", passport.authenticate("bearer", { session: false, failWithError: true }), async(req: Request, res: Response) => {
    const { id } = await TaskParamIdSchema.parseAsync(req.params)
    const { title, completed } = await TaskUpdateSchema.parseAsync(req.body)
    const user = req.user as { id: string }
    const task = await updateTask({ id: id, userId: user.id, title, completed  })
    return res.status(200).json(task)
})

export default router