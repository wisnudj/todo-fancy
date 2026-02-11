"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email().trim().max(255, "email maximum 255 character"),
    password: zod_1.z.string().trim().max(255, "password maximum 255 character")
});
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.email().trim().max(255, "email maximum 255 character"),
    password: zod_1.z.string().trim().max(255, "password maximum 255 character"),
    confirmPassword: zod_1.z.string().trim().max(255, "confirm password maximum 255 character")
});
