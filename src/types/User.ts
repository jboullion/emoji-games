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
