"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.MONGO_DB = exports.MONGO_PORT = exports.MONGO_HOST = exports.MONGO_PASSWORD = exports.MONGO_USERNAME = exports.APP_PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// App Configuration
exports.APP_PORT = Number(process.env.PORT) || 3000;
// MongoDB Configuration
exports.MONGO_USERNAME = process.env.MONGO_USERNAME || "[USERNAME]";
exports.MONGO_PASSWORD = process.env.MONGO_PASSWORD || "[PASSWORD]";
exports.MONGO_HOST = process.env.MONGO_HOST || "localhost";
exports.MONGO_PORT = process.env.MONGO_PORT || "27017";
exports.MONGO_DB = process.env.MONGO_DB || "todo-fancy";
// JWT Configuration    
exports.JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';
exports.JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN) || 3600;
