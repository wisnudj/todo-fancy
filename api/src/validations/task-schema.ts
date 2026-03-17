import { z } from "zod"

const zBoolFromQuery = z.preprocess((v) => {
  if (v === undefined) return undefined
  if (typeof v === "boolean") return v
  if (typeof v === "string") {
    if (v === "true") return true
    if (v === "false") return false
  }
  return v
}, z.boolean().optional())

export const TaskQuerySchema = z.object({
    title: z.string().regex(/^[a-zA-Z0-9_]+$/, "title must alfanumberic").trim().min(1, "title minimum 1").max(50, "title maximum 50").optional(),
    completed: zBoolFromQuery,
    limit: z.coerce
        .number("limit must be integer")
        .int("limit must be integer")
        .positive("limit must be > 0")
        .max(150, "limit maximum 150")
        .default(100),
    page: z.coerce
        .number("page must be integer")
        .int("page must be integer")
        .positive("page must be > 0")
        .default(1)
})

export const TaskAddSchema = z.object({
    title: z.string().trim().min(1, "title minimum 1").max(50, "title maximum 50")
})

export const TaskUpdateSchema = z.object({
    title: z.string().regex(/^[a-zA-Z0-9_]+$/, "title must alfanumberic").trim().min(1, "title minimum 1").max(50, "title maximum 50").optional(),
    completed: zBoolFromQuery
})

export const TaskParamIdSchema = z.object({
    id: z.string().regex(/^[a-zA-Z0-9_]+$/, "title must alfanumberic").trim().min(24, "title must 24 character").max(24, "title must 24 character")
})