import dotenv from "dotenv"
dotenv.config()

// App Configuration
export const APP_PORT: number = Number(process.env.PORT) || 3000

// MongoDB Configuration
export const MONGO_URL: string = process.env.MONGO_URL || ""

// JWT Configuration    
export const JWT_SECRET: string = process.env.JWT_SECRET || 'your_super_secret_jwt_key'
export const JWT_EXPIRES_IN: number = Number(process.env.JWT_EXPIRES_IN) || 3600

