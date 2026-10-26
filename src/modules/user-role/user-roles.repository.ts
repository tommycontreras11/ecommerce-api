import AppDataSource from "../../config/database.js";
import { UserRoleEntity } from "../../database/entities/user-role.entity.js";
import { AssignUserRole } from "./user-roles.validation.js";

const entity = AppDataSource.getRepository(UserRoleEntity);

export const userRolesRepository = {
  findAll(): Promise<UserRoleEntity[]> {
    return entity.find();
  },
  findByUserUuidAndRoleUuid(
    user_uuid: string,
    role_uuid: string,
  ): Promise<UserRoleEntity | null> {
    return entity.findOne({
      where: {
        user: {
          uuid: user_uuid,
        },
        role: {
          uuid: role_uuid,
        },
      },
      relations: {
        user: true,
        role: true,
      },
    });
  },

  assign({ user_uuid, role_uuid }: AssignUserRole) {
    return entity.update(
      { user: { uuid: user_uuid }, role: { uuid: role_uuid } },
      { user: { uuid: user_uuid }, role: { uuid: role_uuid } },
    );
  },
};
