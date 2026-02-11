import { z } from "zod"

export const loginSchema = z.object({
    email: z.email().trim().max(255, "email maximum 255 character"),
    password: z.string().trim().max(255, "password maximum 255 character")
})

export const registerSchema = z.object({
    email: z.email().trim().max(255, "email maximum 255 character"),
    password: z.string().trim().max(255, "password maximum 255 character"),
    confirmPassword: z.string().trim().max(255, "confirm password maximum 255 character")
})