import { EntityManager } from "typeorm";
import AppDataSource from "../../config/database.js";
import { SessionEntity } from "../../database/entities/session.entity.js";
import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";
import { UserEntity } from "../../database/entities/user.entity.js";
import { generateAccessToken, generateRefreshAccessToken } from "./jwt.util.js";

const generate = async (payload: IToken) => {
  return await AppDataSource.manager.transaction(
    async (transactionalManager) => {
      const sub = payload.user.uuid;
      const refreshTokenGenerated = generateRefreshAccessToken({ sub });

      const refreshTokenExpiresAt = new Date();

      refreshTokenExpiresAt.setDate(7);

      return {
        accessToken: generateAccessToken({ sub }),
        refreshToken: refreshTokenGenerated,
      };
    },
  );
};

const saveAccessAndRefreshTokens = async (
  transactionalManager: EntityManager = AppDataSource.manager,
  payload: IToken,
) => {
  const session = await transactionalManager.save(SessionEntity, {
    user: payload.user,
    ip_address: payload.token.ipAddress,
    user_agent: payload.token.userAgent,
  });

  await transactionalManager.save(RefreshTokenEntity, {
    session,
    token_hash: payload.refreshToken.token,
    expires_at: payload.refreshToken.expiresAt,
  });
};

interface IToken {
  user: UserEntity;
  token: {
    ipAddress?: string;
    userAgent?: string;
  };
  refreshToken: {
    token: string;
    expiresAt: Date;
  };
}
