import { EntityManager } from "typeorm";
import AppDataSource from "../../config/database.js";
import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";
import { refreshTokenRepository } from "./refresh-tokens.repository.js";
import { ICreateRefreshToken } from "./refresh-tokens.types.js";

export const refreshTokenService = {
  async create(
    payload: ICreateRefreshToken,
    transactionalManager: EntityManager = AppDataSource.manager,
  ): Promise<RefreshTokenEntity> {
    return await refreshTokenRepository.save(payload, transactionalManager);
  }
};
