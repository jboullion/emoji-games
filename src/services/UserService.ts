const BASE_URL = '/user';
import store from '../store';
import { IUserUpdate, IUser } from '../types/User';

export interface IUserService {
  getUser(): Promise<IUser>;
  updateUser(userUpdate: IUserUpdate): Promise<IUser>;
  updateAvatar(avatar: string): Promise<string | null>;
  updateTickets(tickets: number): Promise<number | null>;
}

export default class UserService implements IUserService {
  constructor(private _axios: any) {}

  private setHeaders() {
    return {
      headers: { Authorization: `Bearer ${store.getters.jwt}` },
    };
  }

  async getUser(): Promise<IUser> {
    const res = await this._axios.get(`${BASE_URL}/`, this.setHeaders());
    return res.data;
  }

  async updateUser(userUpdate: IUserUpdate): Promise<IUser> {
    const res = await this._axios.patch(
      `${BASE_URL}/update`,
      userUpdate,
      this.setHeaders(),
    );
    return res.data;
  }

  async updateAvatar(avatar: string): Promise<string | null> {
    if (!store.getters.isAuthenticated) return null;

    const res = await this._axios.patch(
      `${BASE_URL}/avatar`,
      { emoji: avatar },
      this.setHeaders(),
    );
    return res.data;
  }

  async updateTickets(tickets: number): Promise<number | null> {
    if (!store.getters.isAuthenticated) return null;

    const res = await this._axios.patch(
      `${BASE_URL}/tickets`,
      { tickets },
      this.setHeaders(),
    );
    return res.data;
  }
}
