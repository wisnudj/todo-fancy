import { User, UserModel } from "../models/user"

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const SALT_ROUNDS = 10

export interface AuthResult {
    token: string;
    expiresIn: number;
}

export const register = async (email: string, password: string, confirmPassword: string): Promise<AuthResult> => {
    if (password !== confirmPassword) {
        throw new Error("password do not match")
    }

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) throw new Error("user already exists")

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const user = await UserModel.create({
        email,
        password: hashedPassword
    })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    return {
        token,
        expiresIn: JWT_EXPIRES_IN
    }
}

export const login = async (email: string, password: string): Promise<AuthResult> => {
    const user = await UserModel.findOne({ email })
    if (!user) throw new Error("user not found")

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new Error("invalid password")

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    return {
        token,
        expiresIn: JWT_EXPIRES_IN
    }
}