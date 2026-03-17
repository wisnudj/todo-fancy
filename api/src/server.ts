import * as http from "http"
import app from "./app"
import mongoose from "mongoose"
import * as config from "./config"

const server = http.createServer(app)
server.listen(config.APP_PORT)

server.on("listening", () => {
    console.log(`Server running on port ${config.APP_PORT}`)

    // MongoDB Connection
    mongoose.connect(config.MONGO_URL)
        .then(() => {
            console.log("MongoDB connected")
        })
        .catch((err) => {
            console.error("MongoDB connection error:", err)
            process.exit(1)
        })
})