import {
  generateAccessAndRefreshTokens,
  saveAccessAndRefreshTokens,
} from "../../common/utils/auth.util.js";
import { comparePassword } from "../../common/utils/password.util.js";
import AppDataSource from "../../config/database.js";
import { env } from "../../config/env.js";
import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";
import { SessionEntity } from "../../database/entities/session.entity.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { UnauthorizedException } from "../../exceptions/unauthorized.exception.js";
import { meFormatted, tokensInfoFormatted } from "../../mappers/auth.mapper.js";
import { refreshTokenRepository } from "../refresh-tokens/refresh-tokens.repository.js";
import { refreshTokenService } from "../refresh-tokens/refresh-tokens.service.js";
import { sessionRepository } from "../sessions/sessions.repository.js";
import { userRepository } from "../users/users.repository.js";
import { IMe, ITokensInfo } from "./auth.types.js";
import { SignIn } from "./auth.validation.js";

export const authService = {
  async signIn(
    payload: SignIn & { ipAddress: string; userAgent: string },
  ): Promise<ITokensInfo> {
    const foundUserByEmail = await userRepository.findOneByEmail(payload.email);

    if (!foundUserByEmail)
      throw new UnauthorizedException("User y/o password incorrect");

    const comparePasswords = await comparePassword(
      payload.password,
      foundUserByEmail.password_hash,
    );

    if (!comparePasswords)
      throw new UnauthorizedException("User y/o password incorrect");

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshTokens(foundUserByEmail);

    await AppDataSource.manager.transaction(async (transactionalManager) => {
      const refreshTokenExpiresAt = new Date();

      refreshTokenExpiresAt.setDate(new Date().getDate() + 7);

      await saveAccessAndRefreshTokens(transactionalManager, {
        user: foundUserByEmail,
        token: {
          ipAddress: payload.ipAddress,
          userAgent: payload.userAgent,
        },
        refreshToken: {
          token: refreshToken,
          expiresAt: refreshTokenExpiresAt,
        },
      });
    });

    return tokensInfoFormatted({
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "Bearer",
      expires_in: env.JWT_EXPIRATION_TOKEN,
    });
  },
  async signOut(accessToken: string) {
    await AppDataSource.manager.transaction(async (transactionalManager) => {
      const sessionFound = await sessionRepository.findOneByUuid(accessToken);

      await transactionalManager.update(
        SessionEntity,
        { uuid: sessionFound!.uuid },
        { revoked_at: new Date() },
      );

      const refreshTokensRevoked = await transactionalManager.update(
        RefreshTokenEntity,
        { session: { uuid: sessionFound!.uuid } },
        { revoked_at: new Date() },
      );
    });
  },
  async refresh(token_hash: string): Promise<ITokensInfo> {
    let isRefreshTokenReuseDetected = false;
    const result = await AppDataSource.manager.transaction(
      async (transactionalManager) => {
        const refreshToken = await refreshTokenRepository.findOneByToken(
          token_hash,
          transactionalManager,
        );

        if (!refreshToken)
          throw new UnauthorizedException("Refresh token not found");

        // This basically means that the refresh token has been compromised
        /* The person is trying to use a token that the revoked_date is not null 
           and also the replaced_by_token_id means that the token was already rotated */

        if (refreshToken.revoked_at && refreshToken.replaced_by_token_id) {
          const today = new Date();

          await transactionalManager.update(
            SessionEntity,
            { uuid: refreshToken.session.uuid },
            { revoked_at: today },
          );

          await transactionalManager.update(
            RefreshTokenEntity,
            { session_id: refreshToken.session.id },
            { revoked_at: today },
          );

          isRefreshTokenReuseDetected = true;
        }

        const isRefreshTokenExpired =
          new Date().getTime() > refreshToken.expires_at.getTime();

        if (isRefreshTokenExpired)
          throw new NotFoundException("Refresh token is expired");

        return await refreshTokenService.rotate(
          refreshToken,
          transactionalManager,
        );
      },
    );

    if (isRefreshTokenReuseDetected)
      throw new UnauthorizedException("Refresh token was already revoked");

    return result;
  },
  async me(user_uuid: string): Promise<IMe> {
    const user = await userRepository.findOneByUuid(user_uuid);

    if (!user) throw new NotFoundException("User not found");

    return meFormatted(user);
  },
};
