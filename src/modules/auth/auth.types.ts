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
