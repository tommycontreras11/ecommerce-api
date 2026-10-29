import { UserRoleEntity } from "../database/entities/user-role.entity.js";
import { IUserRole } from "../modules/user-role/user-roles.types.js";

export const userRoleFormatted = (userRole: UserRoleEntity): IUserRole => {
  return {
    user: {
      uuid: userRole.user.uuid,
      first_name: userRole.user.first_name,
      last_name: userRole.user.last_name,
    },
    role: {
      uuid: userRole.role.uuid,
      name: userRole.role.name,
      description: userRole.role?.description ?? null,
    },
  };
};

export const userRolesFormatted = (userRoles: UserRoleEntity[]): IUserRole[] =>
  userRoles.map(userRoleFormatted);
