import { Request, Response, NextFunction } from "express"

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "internal server error"

    res.status(statusCode).json({
        status: "error",
        message,
    })
}

export default errorHandler