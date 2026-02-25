import { Router } from "express"

import { register, login } from "../services/auth-service"
import { loginSchema, registerSchema } from "../validations/auth-schema"

const router = Router()

router.post("/register", async (req, res) => {
    const { email, password, confirmPassword } = await registerSchema.parseAsync(req.body)
    const result = await register(email, password, confirmPassword)
    return res.status(201).json(result)
})

router.post("/login", async (req, res) => {
    const { email, password } = await loginSchema.parseAsync(req.body)
    const result = await login(email, password)
    return res.status(200).json(result)
})

export default router