const BASE_URL = '/user';
import store from '../store';

export interface IUserService {
  updateAvatar(avatar: string): Promise<string>;
}

export default class UserService implements IUserService {
  constructor(private _axios: any) {}

  private setHeaders() {
    return {
      headers: { Authorization: `Bearer ${store.getters.jwt}` },
    };
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