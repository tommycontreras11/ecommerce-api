import AppDataSource from "../../config/database.js";
import { RoleEntity } from "../../database/entities/roles.entity.js";
import { CreateRole, UpdateRole } from "./roles.validation.js";

const entity = AppDataSource.getRepository(RoleEntity);

export const roleRepository = {
  findAll(): Promise<RoleEntity[]> {
    return entity.find();
  },
  findOneByUuid(uuid: string): Promise<RoleEntity | null> {
    return entity.findOneBy({ uuid });
  },
  findOneByName(name: string) {
    return entity.findOneBy({ name });
  },
  save(payload: CreateRole): Promise<RoleEntity> {
    const role = entity.create({
      name: payload.name,
      ...(payload.description && { description: payload.description }),
    });
    return role.save();
  },
  modify(role: RoleEntity, payload: UpdateRole): Promise<RoleEntity> {
    payload.name && (role.name = payload.name);
    payload.description && (role.description = payload.description);
    payload.is_active && (role.is_active = payload.is_active);

    return role.save();
  },
  remove(uuid: string) {
    return entity.delete({ uuid });
  },
};
