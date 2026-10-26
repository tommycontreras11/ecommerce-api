export interface IUser {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_active: boolean;
  email_verified_at: Date | null;
}
