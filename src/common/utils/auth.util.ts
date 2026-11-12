import { EntityManager } from "typeorm";
import AppDataSource from "../../config/database.js";
import { SessionEntity } from "../../database/entities/session.entity.js";
import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";
import { UserEntity } from "../../database/entities/user.entity.js";
import { generateAccessToken, generateRefreshAccessToken } from "./jwt.util.js";

export const generateAccessAndRefreshTokens = async (user: UserEntity) => {
  return {
    accessToken: generateAccessToken({ sub: user.uuid }),
    refreshToken: generateRefreshAccessToken({
      sub: user.uuid,
    }),
  };
};

export const saveAccessAndRefreshTokens = async (
  transactionalManager: EntityManager = AppDataSource.manager,
  payload: IToken,
) => {
  const session = await transactionalManager.save(SessionEntity, {
    user: payload.user,
    ip_address: payload?.token?.ipAddress,
    user_agent: payload?.token?.userAgent,
  });

  await transactionalManager.save(RefreshTokenEntity, {
    session,
    token_hash: payload.refreshToken.token,
    expires_at: payload.refreshToken.expiresAt,
  });
};

interface IToken {
  user: UserEntity;
  token?: {
    ipAddress?: string;
    userAgent?: string;
  };
  refreshToken: {
    token: string;
    expiresAt: Date;
  };
}
