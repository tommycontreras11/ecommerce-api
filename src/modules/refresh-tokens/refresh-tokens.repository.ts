import { EntityManager } from "typeorm";
import AppDataSource from "../../config/database.js";
import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";
import { ICreateRefreshToken, IUpdateRefreshToken } from "./refresh-tokens.types.js";

const entity = AppDataSource.getRepository(RefreshTokenEntity);

export const refreshTokenRepository = {
  findOneByToken(token: string): Promise<RefreshTokenEntity | null> {
    return entity.findOneBy({ token_hash: token });
  },
  save(
    payload: ICreateRefreshToken,
    transactionalManager: EntityManager = AppDataSource.manager,
  ): Promise<RefreshTokenEntity> {
    return transactionalManager.save(RefreshTokenEntity, payload);
  },
  modify(payload: IUpdateRefreshToken, transactionalManager: EntityManager = AppDataSource.manager) {
    return transactionalManager.save(RefreshTokenEntity, payload)
  }
};
