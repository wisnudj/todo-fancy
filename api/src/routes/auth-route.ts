import { Router } from "express"

import { register, login } from "../services/auth"

const router = Router()

router.post("/register", async (req, res) => {
    const { email, password, confirmPassword } = req.body
    const result = await register(email, password, confirmPassword)
    return res.status(201).json(result)
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const result = await login(email, password)
    return res.status(200).json(result)
})

export default router