import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";

export interface IRefreshToken {
  token_hash: string
  user_uuid: string
}

export interface IUpdateRefreshToken {
  replaced_by: RefreshTokenEntity;
}
