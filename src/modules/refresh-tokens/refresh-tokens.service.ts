import {
  generateAccessAndRefreshTokens,
  saveAccessAndRefreshTokens,
} from "../../common/utils/auth.util.js";
import AppDataSource from "../../config/database.js";
import { env } from "../../config/env.js";
import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";
import { SessionEntity } from "../../database/entities/session.entity.js";

export const refreshTokenService = {
  async refresh(refreshTokenFound: RefreshTokenEntity) {
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      refreshTokenFound.session.user,
    );

    await AppDataSource.manager.transaction(async (transactionalManager) => {
      const today = new Date()
      const refreshTokenExpiresAt = new Date();

      refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

      const refreshTokenSaved = await saveAccessAndRefreshTokens(
        transactionalManager,
        {
          user: refreshTokenFound.session.user,
          refreshToken: {
            token: refreshToken,
            expiresAt: refreshTokenExpiresAt,
          },
        },
      );

      await transactionalManager.update(
        SessionEntity,
        { uuid: refreshTokenFound.session.uuid },
        { revoked_at: today },
      );

      await transactionalManager.update(
        RefreshTokenEntity,
        { uuid: refreshTokenFound.uuid },
        {
          replaced_by_token_id: refreshTokenSaved.refreshToken.id,
          revoked_at: today,
        },
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
