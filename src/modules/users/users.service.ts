import { hashPassword } from "../../common/utils/password.util.js";
import { ConflictException } from "../../exceptions/conflict.exception.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { userFormatted, usersFormatted } from "../../mappers/user.mapper.js";
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

    const userCreated = await userRepository.save({
      ...payload,
      password: await hashPassword(payload.password),
    });

    return userFormatted(userCreated);
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
