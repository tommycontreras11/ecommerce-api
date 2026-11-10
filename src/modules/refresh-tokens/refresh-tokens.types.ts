import { SessionEntity } from "../../database/entities/session.entity.js";

export interface ICreateRefreshToken {
  token_hash: string;
  expires_at: Date;
  session: SessionEntity;
}
