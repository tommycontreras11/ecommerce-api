export interface IPermission {
  uuid: string;
  name: string;
  description: string | null;
  resource: string;
  action: string;
}