export interface IRole {
  uuid: string;
  name: string;
  description: string | null;
  is_active: boolean;
}

export interface ICreateRole {
  name: string;
  description: string | null
}

export interface IUpdateRole {
  name: string | null;
  description: string | null;
  is_active: boolean | null;
}
