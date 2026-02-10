"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};
exports.default = notFoundHandler;
