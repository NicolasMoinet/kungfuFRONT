

export interface UserType {
  id?: string;
  email: string;
  password: string;
  name: string;
  description: string;
  role?: string;
  accessToken?: string | undefined;
}
