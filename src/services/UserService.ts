import store from '../store';
import { IUserUpdate, IUser } from '../types/User';
import { setHeaders } from '../utilities/axios';

export interface IUserService {
  getUser(): Promise<IUser>;
  updateUser(userUpdate: IUserUpdate): Promise<IUser>;
  updateAvatar(avatar: string): Promise<string | null>;
  updateTickets(tickets: number): Promise<number | null>;
}

const BASE_URL = '/v1/user';
export default class UserService implements IUserService {
  constructor(private _axios: any) {}

  async getUser(): Promise<IUser> {
    const res = await this._axios.get(`${BASE_URL}/`, setHeaders());
    return res.data;
  }

  async updateUser(userUpdate: IUserUpdate): Promise<IUser> {
    const res = await this._axios.patch(
      `${BASE_URL}/update`,
      userUpdate,
      setHeaders(),
    );
    return res.data;
  }

  async updateAvatar(avatar: string): Promise<string | null> {
    if (!store.getters.isAuthenticated) return null;

    const res = await this._axios.patch(
      `${BASE_URL}/avatar`,
      { emoji: avatar },
      setHeaders(),
    );
    return res.data;
  }

  async updateTickets(tickets: number): Promise<number | null> {
    if (!store.getters.isAuthenticated) return null;

    const res = await this._axios.patch(
      `${BASE_URL}/tickets`,
      { tickets },
      setHeaders(),
    );
    return res.data;
  }
}
