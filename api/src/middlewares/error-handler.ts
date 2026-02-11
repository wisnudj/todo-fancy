import { Request, Response, NextFunction } from "express"
import { z } from "zod"

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof z.ZodError) {
        console.log(err)
        return res.status(422).json({
            status: "error",
            message: "validation error"
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