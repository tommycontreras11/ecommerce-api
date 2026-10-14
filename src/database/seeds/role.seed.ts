import { DataSource } from "typeorm"
import { RoleEntity } from "../entities/roles.entity.js"
import { rolesData } from "./data/roles.data.js"

export const roleSeeder = async (dataSource: DataSource) => {
    try {
        const roleEntity = dataSource.getRepository(RoleEntity)

        await Promise.all(rolesData.map(async (data) => {
            const foundRole = await roleEntity.findOneBy({ name: data.name })
            if(foundRole) return 

            const role = roleEntity.create({
                name: data.name,
                ...(data.description && { description: data.description })
            })
            
            await role.save()
        }))
    } catch (error) {
        console.error(`Something went wrong while trying to save the roles on RoleSeeder: `, error)
    }
}