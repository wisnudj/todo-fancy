import { Request, Response, NextFunction } from "express"

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error(`Not Found - ${req.originalUrl}`)
    error.statusCode = 404
    next(error)
}

export default notFoundHandler