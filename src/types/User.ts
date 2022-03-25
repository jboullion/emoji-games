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
  uuid: string;
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

export interface IUserUpdate {
  username?: string;
  email?: string;
  password: string;
  passwordNew: string | null;
}
