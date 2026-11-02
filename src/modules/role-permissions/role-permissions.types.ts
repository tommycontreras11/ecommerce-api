interface IRole {
  uuid: string;
  name: string;
  description: string | null;
}

interface IPermission {
  uuid: string;
  name: string;
  description: string | null;
  resource: string
  action: string
}

export interface IRolePermission {
  permission: IPermission;
  role: IRole;
}


export interface RolePermissionIdentifier {
  role_uuid: string;
  permission_uuid: string;
}
