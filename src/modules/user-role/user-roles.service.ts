import { RoleEntity } from "../../database/entities/roles.entity.js";
import { UserEntity } from "../../database/entities/user.entity.js";
import { ConflictException } from "../../exceptions/conflict.exception.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import {
  userRoleFormatted,
  userRolesFormatted,
} from "../../mappers/user-role.mapper.js";
import { roleRepository } from "../roles/roles.repository.js";
import { userRepository } from "../users/users.repository.js";
import { userRolesRepository } from "./user-roles.repository.js";
import { UserRoleIdentifier, IUserRole } from "./user-roles.types.js";
import { AssignUserRole } from "./user-roles.validation.js";

const validateExistingUserAndRole = async (
  payload: UserRoleIdentifier,
): Promise<{ user: UserEntity; role: RoleEntity }> => {
  const user = await userRepository.findOneByUuid(payload.user_uuid);

  if (!user) throw new NotFoundException("User not found");

  const role = await roleRepository.findOneByUuid(payload.role_uuid);

  if (!role) throw new NotFoundException("Role not found");

  return { user, role };
};

export const userRolesService = {
  async getAll(filter?: UserRoleIdentifier): Promise<IUserRole[]> {
    const userRoles = await userRolesRepository.findAll(filter);

    return userRolesFormatted(userRoles);
  },
  async delete(payload: UserRoleIdentifier): Promise<{ message: string }> {
    const userRole =
      await userRolesRepository.findByUserUuidAndRoleUuid(payload);

    if (!userRole) throw new NotFoundException("User role not found");

    await userRolesRepository.remove(userRole.user, userRole.role);

    return { message: "User role deleted successfully" };
  },
};
