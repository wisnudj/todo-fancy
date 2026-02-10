import express, { Express } from "express"
import notFoundHandler from "./middlewares/not-found-handler"
import errorHandler from "./middlewares/error-handler"
import authRoute from "./routes/auth-route"

const app: Express = express()
app.use(express.json())

app.use("/api/auth", authRoute)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
