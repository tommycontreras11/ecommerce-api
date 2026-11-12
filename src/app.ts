import "reflect-metadata"
import express from "express"
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware.js"
import routes from "./routes/index.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(routes)
app.use(errorHandlerMiddleware)

export default app