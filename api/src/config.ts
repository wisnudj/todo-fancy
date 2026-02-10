import dotenv from "dotenv"
dotenv.config()

// App Configuration
export const APP_PORT: number = Number(process.env.PORT) || 3000

// MongoDB Configuration
export const MONGO_USERNAME: string = process.env.MONGO_USERNAME || "[USERNAME]"
export const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || "[PASSWORD]"
export const MONGO_HOST: string = process.env.MONGO_HOST || "localhost"
export const MONGO_PORT: string = process.env.MONGO_PORT || "27017"
export const MONGO_DB: string = process.env.MONGO_DB || "todo-fancy"

// JWT Configuration    
export const JWT_SECRET: string = process.env.JWT_SECRET || 'your_super_secret_jwt_key'
export const JWT_EXPIRES_IN: number = Number(process.env.JWT_EXPIRES_IN) || 3600

