import {
  generateAccessAndRefreshTokens,
  saveAccessAndRefreshTokens,
} from "../../common/utils/auth.util.js";
import AppDataSource from "../../config/database.js";
import { env } from "../../config/env.js";
import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";
import { SessionEntity } from "../../database/entities/session.entity.js";
import { ConflictException } from "../../exceptions/conflict.exception.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { refreshTokenRepository } from "./refresh-tokens.repository.js";

export const refreshTokenService = {
  async refresh(
    token_hash: string,
  ) {
    const refreshTokenFound = await refreshTokenRepository.findOneByToken(
      token_hash,
    );

    if (!refreshTokenFound)
      throw new NotFoundException("Refresh token not found");

    const isRefreshTokenExpired =
      new Date().getTime() > refreshTokenFound.expires_at.getTime();

    if (isRefreshTokenExpired)
      throw new NotFoundException("Refresh token is expired");

    if (refreshTokenFound.revoked_at)
      throw new ConflictException("Refresh token was already revoked");

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      refreshTokenFound.session.user,
    );

    await AppDataSource.manager.transaction(async (transactionalManager) => {
      const refreshTokenExpiresAt = new Date();

      refreshTokenExpiresAt.setDate(7);

      await saveAccessAndRefreshTokens(transactionalManager, {
        user: refreshTokenFound.session.user,
        refreshToken: {
          token: refreshToken,
          expiresAt: refreshTokenExpiresAt,
        },
      });

      await transactionalManager.update(
        SessionEntity,
        { uuid: refreshTokenFound.session.uuid },
        { revoked_at: new Date() },
      );

      await transactionalManager.update(
        RefreshTokenEntity,
        { uuid: refreshTokenFound.uuid },
        { replaced_by_token_id: refreshTokenFound.id },
      );
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "Bearer",
      expires_in: env.JWT_EXPIRATION_TOKEN,
    };
  },
};
