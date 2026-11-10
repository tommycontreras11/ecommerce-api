import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";
import { SessionEntity } from "../../database/entities/session.entity.js";

export interface ICreateRefreshToken {
  token_hash: string;
  expires_at: Date;
  session: SessionEntity;
}

export interface IRefreshToken {
  token_hash: string
  user_uuid: string
}

export interface IUpdateRefreshToken {
  replaced_by: RefreshTokenEntity;
}
