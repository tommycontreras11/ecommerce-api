import app from "./app.js"
import { env } from "./config/env.js"
import { connectDatabase } from "./database/initialize.js"

const bootstrap = async () => {
    await connectDatabase()
    app.listen(env.PORT, () => console.log(`The server is running on port ${env.PORT}`))
}

bootstrap()