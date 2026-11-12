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
