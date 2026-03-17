import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { UserModel } from "../models/user"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config"
import { registerSchema }  from "../validations/auth-schema"


const SALT_ROUNDS = 10

export interface AuthResult {
    token: string;
    expiresIn: number;
    email: string;
}

export interface UserResult {
    id: string;
    email: string;
}

export const register = async (email: string, password: string, confirmPassword: string): Promise<AuthResult> => {
    await registerSchema.parseAsync({ email, password, confirmPassword })

    if (password !== confirmPassword) {
        throw new Error("PASSWORD_DO_NOT_MATCH")
    }

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) throw new Error("USER_ALREADY_EXISTS")

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const user = await UserModel.create({
        email,
        password: hashedPassword
    })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    return {
        token,
        expiresIn: JWT_EXPIRES_IN,
        email: email
    }
}

export const login = async (email: string, password: string): Promise<AuthResult> => {
    const user = await UserModel.findOne({ email })
    if (!user) throw new Error("USER_NOT_FOUND")

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new Error("INVALID_PASSWORD")

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    return {
        token,
        expiresIn: JWT_EXPIRES_IN,
        email: email
    }
}

export const verify = async (token: string) : Promise<string> => {
    let decoded: jwt.JwtPayload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
    const user = await UserModel.findById(decoded.id)
    if(!user) throw new Error("USER_TOKEN_NOT_FOUND")
    return decoded.id
}