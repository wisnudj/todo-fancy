import { Request, Response, NextFunction } from "express"
import { z, ZodError } from "zod"
import { logger as log } from "../logger"

function flattenZodUnique(err: ZodError): { type: string, message: string }[] {
    const map = new Map<string, string>()

    for (const issue of err.issues) {
        const type = issue.path.length ? issue.path.join(".") : "form"
        if (!map.has(type)) map.set(type, issue.message)
    }

    return Array.from(map, ([type, message]) => ({ type, message }))
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    log.error(err)

    if (err instanceof z.ZodError) {
        return res.status(422).json({
            status: "error",
            message: "validation error",
            errors: flattenZodUnique(err)
        })
    }

    let statusCode = err.statusCode || 500
    let message = err.message || "internal server error"

    switch (message) {
        case "USER_NOT_FOUND":
            statusCode = 404
            message = "user not found"
            break
        case "INVALID_PASSWORD":
            statusCode = 401
            message = "invalid password"
            break
        case "USER_ALREADY_EXISTS":
            statusCode = 409
            message = "user already exists"
            break
        case "PASSWORD_DO_NOT_MATCH":
            statusCode = 400
            message = "password do not match"
            break
    }

    res.status(statusCode).json({
        status: "error",
        message,
    })
}

export default errorHandler