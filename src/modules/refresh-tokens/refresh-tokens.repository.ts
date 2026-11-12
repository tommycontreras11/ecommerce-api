import { EntityManager } from "typeorm";
import AppDataSource from "../../config/database.js";
import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";
import { IUpdateRefreshToken } from "./refresh-tokens.types.js";

const entity = AppDataSource.getRepository(RefreshTokenEntity);

export const refreshTokenRepository = {
  findOneByToken(token: string): Promise<RefreshTokenEntity | null> {
    return entity.findOneBy({ token_hash: token });
  },
  modify(payload: IUpdateRefreshToken, transactionalManager: EntityManager = AppDataSource.manager) {
    return transactionalManager.save(RefreshTokenEntity, payload)
  }
};
