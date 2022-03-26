const BASE_URL = '/user';
import store from '../store';
import { IUserUpdate, IUser } from '../types/User';

export interface IUserService {
  updateUser(userUpdate: IUserUpdate): Promise<IUser>;
  updateAvatar(avatar: string): Promise<string>;
}

export default class UserService implements IUserService {
  constructor(private _axios: any) {}

  private setHeaders() {
    return {
      headers: { Authorization: `Bearer ${store.getters.jwt}` },
    };
  }

  async updateUser(userUpdate: IUserUpdate): Promise<IUser> {
    const res = await this._axios.patch(
      `${BASE_URL}/update`,
      userUpdate,
      this.setHeaders(),
    );
    return res.data;
  }

  async updateAvatar(avatar: string): Promise<string> {
    const res = await this._axios.patch(
      `${BASE_URL}/avatar`,
      { emoji: avatar },
      this.setHeaders(),
    );
    return res.data;
  }
}
