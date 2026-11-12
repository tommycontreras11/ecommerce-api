import { RefreshTokenEntity } from "../../database/entities/refresh-token.entity.js";

export interface IUpdateRefreshToken {
  replaced_by: RefreshTokenEntity;
}
