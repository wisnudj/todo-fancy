import * as http from "http"
import app from "./app"
import mongoose from "mongoose"
import * as config from "./config"

const server = http.createServer(app)
server.listen(config.APP_PORT)

server.on("listening", () => {
    console.log(`Server running on port ${config.APP_PORT}`)

    // MongoDB Connection
    const mongoURI = `mongodb://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DB}`
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("MongoDB connected")
        })
        .catch((err) => {
            console.error("MongoDB connection error:", err)
            process.exit(1)
        })
})