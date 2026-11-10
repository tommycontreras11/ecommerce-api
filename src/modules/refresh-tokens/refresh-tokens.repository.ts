import { EntityManager } from "typeorm";
import AppDataSource from "../../config/database.js";
import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";
import { ICreateRefreshToken } from "./refresh-tokens.types.js";

export const refreshTokenRepository = {
  save(
    payload: ICreateRefreshToken,
    transactionalManager: EntityManager = AppDataSource.manager,
  ): Promise<RefreshTokenEntity> {
    return transactionalManager.save(RefreshTokenEntity, payload);
  },
};
