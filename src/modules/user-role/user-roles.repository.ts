import { DeleteResult } from "typeorm";
import AppDataSource from "../../config/database.js";
import { RoleEntity } from "../../database/entities/roles.entity.js";
import { UserRoleEntity } from "../../database/entities/user-role.entity.js";
import { UserEntity } from "../../database/entities/user.entity.js";
import { UserRoleIdentifier } from "./user-roles.types.js";

const entity = AppDataSource.getRepository(UserRoleEntity);

export const userRolesRepository = {
  findAll(filter?: UserRoleIdentifier): Promise<UserRoleEntity[]> {
    let query = { user: { }, role: { } }

    if(filter?.user_uuid) {
      query.user = { uuid: filter.user_uuid } 
    }

    if(filter?.role_uuid) {
      query.role = { uuid: filter.role_uuid } 
    }
    
    return entity.find({
      relations: { 
        user: true,
        role: true
      },
      ...(filter && { where: { ...query } })
    });
  },
  findByUserUuidAndRoleUuid(
    payload: UserRoleIdentifier,
  ): Promise<UserRoleEntity | null> {
    return entity.findOne({
      where: {
        user: { uuid: payload.user_uuid },
        role: { uuid: payload.role_uuid },
      },
      relations: { user: true, role: true },
    });
  },
  save(user: UserEntity, role: RoleEntity): Promise<UserRoleEntity> {
    const userRole = entity.create({ user, role })
    return entity.save(userRole);
  },
  remove(user: UserEntity, role: RoleEntity): Promise<DeleteResult> {
    return entity.delete({
      user_id: user.id,
      role_id: role.id
    });
  },
};
