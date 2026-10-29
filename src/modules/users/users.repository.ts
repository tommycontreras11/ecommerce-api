import { EntityManager } from "typeorm";
import AppDataSource from "../../config/database.js";
import { UserEntity } from "../../database/entities/user.entity.js";
import { CreateUser, UpdateUser } from "./users.validation.js";

const entity = AppDataSource.getRepository(UserEntity);

export const userRepository = {
  findAll(): Promise<UserEntity[]> {
    return entity.find();
  },
  findOneByUuid(uuid: string): Promise<UserEntity | null> {
    return entity.findOneBy({ uuid });
  },
  findOneByEmail(email: string): Promise<UserEntity | null> {
    return entity.findOneBy({ email });
  },
  save(payload: CreateUser, transactionalManager: EntityManager): Promise<UserEntity> {
    return transactionalManager.save(UserEntity, { ...payload, password_hash: payload.password });
  },
  modify(user: UserEntity, payload: UpdateUser): Promise<UserEntity> {
    payload.first_name && (user.first_name = payload.first_name);
    payload.last_name && (user.last_name = payload.last_name);
    payload.email && (user.email = payload.email);
    payload.password && (user.password_hash = payload.password);

    return user.save();
  },
  remove(uuid: string) {
    return entity.softDelete({ uuid });
  },
};
