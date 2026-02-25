import express, { Express } from "express"
import notFoundHandler from "./middlewares/not-found-handler"
import errorHandler from "./middlewares/error-handler"
import httpLogger from "./middlewares/http-logger"
import authRoute from "./routes/auth-route"
import taskRoute from "./routes/task-route"
import cors from "cors"

const app: Express = express()
app.use(express.json())
app.use(httpLogger)
app.use(cors())

app.use("/api/auth", authRoute)
app.use("/api/task", taskRoute)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
