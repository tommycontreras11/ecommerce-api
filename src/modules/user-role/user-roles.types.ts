interface IUser {
  uuid: string;
  first_name: string;
  last_name: string;
}

interface IRole {
  uuid: string;
  name: string;
  description: string | null;
}

export interface IUserRole {
  user: IUser;
  role: IRole;
}

export interface UserRoleIdentifier {
  user_uuid: string;
  role_uuid: string;
}
