import AppDataSource from "../../config/database.js"
import { roleSeeder } from "./role.seed.js"

export const seed = async () => {
    await AppDataSource.initialize()

    await roleSeeder(AppDataSource)

    console.log(`✅ Seeding completed successfully`)
}

seed()