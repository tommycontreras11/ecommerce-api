import app from "./app.js"
import { env } from "./config/env.js"
import { connectRedis } from "./config/redis.js"
import { connectDatabase } from "./database/initialize.js"

const bootstrap = async () => {
    await connectDatabase()
    await connectRedis()
    app.listen(env.PORT, () => console.log(`The server is running on port ${env.PORT}`))
}

bootstrap()