export interface IRole {
  uuid: string;
  name: string;
  description: string | null;
  is_active: boolean;
}

export interface ICreateRole {
  name: string;
  description: string | null;
}
