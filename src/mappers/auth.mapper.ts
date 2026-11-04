import { UserEntity } from "../database/entities/user.entity.js";
import { IMe } from "../modules/auth/auth.types.js";

export const meFormatted = (user: UserEntity): IMe => {
  return {
    uuid: user.uuid,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    is_active: user.is_active,
    email_verified_at: user.email_verified_at ?? null,
    roles: user.user_roles.flatMap((user_role) => ({
      uuid: user_role.role.uuid,
      description: user_role.role.description ?? null,
      permissions: user_role.role.role_permissions.flatMap(
        (role_permission) => ({
          uuid: role_permission.permission.uuid,
          description: role_permission.permission.description ?? null,
          resource: role_permission.permission.resource,
          action: role_permission.permission.action,
        }),
      ),
    })),
  };
};
