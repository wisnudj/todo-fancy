"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_1 = require("../models/user");
const config_1 = require("../config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SALT_ROUNDS = 10;
const register = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
        throw new Error("password do not match");
    }
    const existingUser = await user_1.UserModel.findOne({ email });
    if (existingUser)
        throw new Error("user already exists");
    const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUNDS);
    const user = await user_1.UserModel.create({
        email,
        password: hashedPassword
    });
    const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_SECRET, { expiresIn: config_1.JWT_EXPIRES_IN });
    return {
        token,
        expiresIn: config_1.JWT_EXPIRES_IN
    };
};
exports.register = register;
const login = async (email, password) => {
    const user = await user_1.UserModel.findOne({ email });
    if (!user)
        throw new Error("user not found");
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid)
        throw new Error("invalid password");
    const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_SECRET, { expiresIn: config_1.JWT_EXPIRES_IN });
    return {
        token,
        expiresIn: config_1.JWT_EXPIRES_IN
    };
};
exports.login = login;
