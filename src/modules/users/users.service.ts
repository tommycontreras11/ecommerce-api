import { hashPassword } from "../../common/utils/password.util.js";
import AppDataSource from "../../config/database.js";
import { UserEntity } from "../../database/entities/user.entity.js";
import { ConflictException } from "../../exceptions/conflict.exception.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { userFormatted, usersFormatted } from "../../mappers/user.mapper.js";
import { roleRepository } from "../roles/roles.repository.js";
import { userRolesRepository } from "../user-role/user-roles.repository.js";
import { userRepository } from "./users.repository.js";
import { IUser } from "./users.types.js";
import { CreateUser, UpdateUser } from "./users.validation.js";

export const userService = {
  async getAll(): Promise<IUser[]> {
    return usersFormatted(await userRepository.findAll());
  },
  async getByUuid(uuid: string): Promise<IUser> {
    const user = await userRepository.findOneByUuid(uuid);

    if (!user) throw new NotFoundException("User not found");

    return userFormatted(user);
  },
  async create(payload: CreateUser): Promise<IUser> {
    const foundUserByEmail = await userRepository.findOneByEmail(payload.email);

    if (foundUserByEmail)
      throw new ConflictException("Please, select other email");

    const foundRole = await roleRepository.findOneByUuid(payload.role_uuid);
    if (!foundRole) throw new NotFoundException("Role not found");

    const hashedPassword = await hashPassword(payload.password);

    const user = await AppDataSource.manager.transaction(
      async (transactionalManager) => {
        const user = await userRepository.save(
          {
            ...payload,
            password: hashedPassword,
          },
          transactionalManager,
        );

        await userRolesRepository.save(
          {
            user,
            role: foundRole,
          },
          transactionalManager,
        );

        return user;
      },
    );

    return userFormatted(user);
  },
  async update(uuid: string, payload: UpdateUser) {
    const user = await userRepository.findOneByUuid(uuid);

    if (!user) throw new NotFoundException("User not found");

    if (payload.email) {
      const foundUserByEmail = await userRepository.findOneByEmail(
        payload.email,
      );

      if (foundUserByEmail && user.uuid != foundUserByEmail.uuid)
        throw new ConflictException("Please, select other email");
    }

    const userUpdated = await userRepository.modify(user, {
      ...payload,
      password: payload.password && (await hashPassword(payload.password)),
    });

    return userFormatted(userUpdated);
  },
  async delete(uuid: string) {
    const user = await userRepository.findOneByUuid(uuid);

    if (!user) throw new NotFoundException("User not found");

    await userRepository.remove(uuid);

    return {
      message: "User deleted successfully",
    };
  },
};
