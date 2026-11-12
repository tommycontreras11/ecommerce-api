import { generateAccessAndRefreshTokens, saveAccessAndRefreshTokens } from "../../common/utils/auth.util.js";
import { comparePassword } from "../../common/utils/password.util.js";
import AppDataSource from "../../config/database.js";
import { env } from "../../config/env.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { UnauthorizedException } from "../../exceptions/unauthorized.exception.js";
import { meFormatted } from "../../mappers/auth.mapper.js";
import { refreshTokenService } from "../refresh-tokens/refresh-tokens.service.js";
import { userRepository } from "../users/users.repository.js";
import { IMe } from "./auth.types.js";
import { SignIn } from "./auth.validation.js";

export const authService = {
  async signIn(payload: SignIn & { ipAddress: string; userAgent: string }) {
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

      refreshTokenExpiresAt.setDate(7);

      await saveAccessAndRefreshTokens(transactionalManager, {
        user: foundUserByEmail,
        token: {
          ipAddress: payload.ipAddress,
          userAgent: payload.userAgent
        },
        refreshToken: {
          token: refreshToken,
          expiresAt: refreshTokenExpiresAt
        }
      })
    })

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "Bearer",
      expires_in: env.JWT_EXPIRATION_TOKEN,
    };
  },
  async refresh(token_hash: string) {
    return await refreshTokenService.refresh(token_hash)
  },
  async me(user_uuid: string): Promise<IMe> {
    const user = await userRepository.findOneByUuid(user_uuid);

    if (!user) throw new NotFoundException("User not found");

    return meFormatted(user);
  },
};
