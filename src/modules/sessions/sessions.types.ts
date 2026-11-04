import { UserEntity } from "../../database/entities/user.entity.js";

export interface ICreateSession {
  user: UserEntity;
  token_hash: string; // Refresh token
  ip_address?: string;
  user_agent?: string;
}

export interface IUpdateSession {
  token_hash?: string; // Refresh token
  token_family_uuid: string;
  revoked_at?: Date;
}

export interface ISession {
  uuid: string;
  user: IUser;
  ip_address: string | null;
  user_agent: string | null;
}

export interface IUser {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
}
