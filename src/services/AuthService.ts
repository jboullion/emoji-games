import {
  IAuthCredentials,
  IAuthRefreshCredentials,
  ISignInResponse,
} from '../types/Auth';
import store from '../store';
import router from '../router';
import { IUser } from '../types/User';
import { parseJwt } from '../utilities/common';

const BASE_URL = '/auth';

export interface IAuthService {
  /**
   * Log in to account
   */
  signin(credentials: IAuthCredentials): Promise<ISignInResponse>;

  /**
   * Create an account
   */
  signup(credentials: IAuthCredentials): Promise<IUser>;

  /**
   * Refresh our authentication
   */
  refresh(): Promise<IUser>;

  /**
   * Log a user out
   */
  signout(): void;
}

export default class AuthService implements IAuthService {
  constructor(private _axios: any) {}

  async signin(credentials: IAuthCredentials): Promise<ISignInResponse> {
    const res = await this._axios.post(`${BASE_URL}/signin`, credentials);
    if (res.data.accessToken) {
      router.push({ path: '/' });
      this.updateAccess(res.data);
    }
    return res.data;
  }

  async signup(credentials: IAuthCredentials): Promise<IUser> {
    const res = await this._axios.post(`${BASE_URL}/signup`, credentials);
    return res.data;
  }

  async refresh(): Promise<IUser> {
    const accessToken: string = localStorage.getItem('accessToken') as string;
    const refreshToken: string = localStorage.getItem('refreshToken') as string;

    const decodedToken = parseJwt(accessToken);

    const credentials: IAuthRefreshCredentials = {
      email: decodedToken?.email,
      refreshToken: refreshToken,
    };

    const res = await this._axios.post(`${BASE_URL}/refresh`, credentials);
    this.updateAccess(res.data);

    return res.data;
  }

  signout(): void {
    router.push({ path: '/login' });

    store.commit('setAccessToken', '');
    store.commit('setRefreshToken', '');
    store.commit('setAccessExpires', '');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessExpires');
  }

  private updateAccess(tokens: ISignInResponse) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessExpires');

    store.commit('setAccessToken', tokens.accessToken);
    localStorage.setItem('accessToken', tokens.accessToken);
    store.commit('setRefreshToken', tokens.refreshToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);

    const decodedToken = parseJwt(tokens.accessToken);
    localStorage.setItem('avatar', decodedToken.avatar);

    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    store.commit('setAccessExpires', expires.toString());
    localStorage.setItem('accessExpires', expires.toString());
  }
}
