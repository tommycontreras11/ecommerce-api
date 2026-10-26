import { UserEntity } from "../database/entities/user.entity.js";
import { IUser } from "../modules/users/users.types.js";

export const userFormatted = (user: UserEntity): IUser => {
  return {
    uuid: user.uuid,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: user.password_hash,
    is_active: user.is_active,
    email_verified_at: user.email_verified_at ?? null,
  };
};

export const usersFormatted = (users: UserEntity[]): IUser[] =>
  users.map(userFormatted);
