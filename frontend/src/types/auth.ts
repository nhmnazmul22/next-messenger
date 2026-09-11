export interface RegisterType {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface LoginType {
  email: string;
  password: string;
}
