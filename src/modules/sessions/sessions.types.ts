import { UserEntity } from "../../database/entities/user.entity.js";

export interface ICreateSession {
  device_name?: string;
  ip_address?: string;
  user_agent?: string;
  user: UserEntity;
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
