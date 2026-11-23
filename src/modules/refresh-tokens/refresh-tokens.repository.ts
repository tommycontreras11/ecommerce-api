import { EntityManager, IsNull } from "typeorm";
import AppDataSource from "../../config/database.js";
import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";
import { IUpdateRefreshToken } from "./refresh-tokens.types.js";

export const refreshTokenRepository = {
  findOneByToken(
    token: string,
    transactionalManager: EntityManager,
  ): Promise<RefreshTokenEntity | null> {
    return transactionalManager.findOne(RefreshTokenEntity, {
      relations: { session: { user: true } },
      where: { token_hash: token },
      lock: { mode: "pessimistic_write" },
    });
  },
  findCurrent(
    token: string,
    transactionalManager: EntityManager,
  ): Promise<RefreshTokenEntity | null> {
    return transactionalManager.findOne(RefreshTokenEntity, {
      relations: { session: true },
      where: { token_hash: token, replaced_by_token_id: IsNull(), revoked_at: IsNull() },
      lock: { mode: "pessimistic_write" },
    });
  },
  modify(
    payload: IUpdateRefreshToken,
    transactionalManager: EntityManager = AppDataSource.manager,
  ) {
    return transactionalManager.save(RefreshTokenEntity, payload);
  },
};
