export interface IMe {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  email_verified_at: Date | null;
  roles: IRole[];
}

interface IRole {
  uuid: string;
  description: string | null;
  permissions: IPermission[];
}

interface IPermission {
  uuid: string;
  description: string | null;
  resource: string;
  action: string;
}

export interface ITokensInfo {
  access_token: string,
  refresh_token: string,
  token_type: "Bearer",
  expires_in: string,
}
