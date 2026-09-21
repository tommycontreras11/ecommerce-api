import express from "express"
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware.js"

const app = express()

app.use(errorHandlerMiddleware)

export default app