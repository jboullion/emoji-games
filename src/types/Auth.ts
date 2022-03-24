export interface IAuthCredentials {
  username: string;
  email: string;
  password: string;
}

export interface IAuthRefreshCredentials {
  email: string;
  refreshToken: string;
}

export interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthForm {
  email: string;
  password: string;
  errors: {
    email: string;
    password: string;
  };
}

export enum UserStatus {
  UNACTIVATED = 'UNACTIVATED',
  ACTIVATED = 'ACTIVATED',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  DISABLED = 'DISABLED',
  BANNED = 'BANNED',
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  avatar: string;
  tickets: number;
  premium_tickets: number;
  premium: boolean;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}
