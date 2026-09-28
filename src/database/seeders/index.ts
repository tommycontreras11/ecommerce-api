import AppDataSource from "../data-source.js"
import { roleSeeder } from "./01-roles.seeder.js"

export const seed = async () => {
    await AppDataSource.initialize()

    await roleSeeder(AppDataSource)

    console.log(`✅ Seeding completed successfully`)
}

seed()