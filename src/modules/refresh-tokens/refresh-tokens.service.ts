import { EntityManager } from "typeorm";
import AppDataSource from "../../config/database.js";
import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";
import { refreshTokenRepository } from "./refresh-tokens.repository.js";
import { ICreateRefreshToken, IRefreshToken } from "./refresh-tokens.types.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { ConflictException } from "../../exceptions/conflict.exception.js";
import { generateRefreshAccessToken } from "../../common/utils/jwt.util.js";

export const refreshTokenService = {
  async create(
    payload: ICreateRefreshToken,
    transactionalManager: EntityManager = AppDataSource.manager,
  ): Promise<RefreshTokenEntity> {
    return await refreshTokenRepository.save(payload, transactionalManager);
  },
  async refresh(payload: IRefreshToken) {
    const refreshToken = await refreshTokenRepository.findOneByToken(payload.token_hash)

    if(!refreshToken) throw new NotFoundException("Refresh token not found")
    
    const isRefreshTokenExpired = (new Date).getTime() > refreshToken.expires_at.getTime()

    if(isRefreshTokenExpired) throw new NotFoundException("Refresh token is expired")

    if(refreshToken.revoked_at) throw new ConflictException("Refresh token was already revoked")

    await AppDataSource.manager.transaction(async (transactionalManager) => {
        const sub = payload.user_uuid;
        const refreshTokenGenerated = generateRefreshAccessToken({ sub });

        const refreshTokenExpiresAt = new Date();

        refreshTokenExpiresAt.setDate(7);

        // TODO: Generate token

        // TODO: Add the replacement token
        //await refreshTokenRepository.modify({ replaced_by:  })
    })
  }
};
