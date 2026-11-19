import { EntityManager, IsNull } from "typeorm";
import {
  generateAccessAndRefreshTokens,
  saveAccessAndRefreshTokens,
} from "../../common/utils/auth.util.js";
import { env } from "../../config/env.js";
import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";
import { UnauthorizedException } from "../../exceptions/unauthorized.exception.js";
import { tokensInfoFormatted } from "../../mappers/auth.mapper.js";
import { ITokensInfo } from "../auth/auth.types.js";

export const refreshTokenService = {
  async rotate(
    refreshTokenFound: RefreshTokenEntity,
    transactionalManager: EntityManager,
  ): Promise<ITokensInfo> {
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      refreshTokenFound.session.user,
    );

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

    const refreshTokenRevoked = await transactionalManager.update(
      RefreshTokenEntity,
      { uuid: refreshTokenFound.uuid, revoked_at: IsNull() },
      {
        replaced_by_token_id: refreshTokenSaved.refreshToken.id,
        revoked_at: new Date(),
      },
    );

    if (refreshTokenRevoked.affected == 0)
      throw new UnauthorizedException("Refresh token is no longer valid");

    return tokensInfoFormatted({
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "Bearer",
      expires_in: env.JWT_EXPIRATION_TOKEN,
    });
  },
};
