import store from '../store';
import { IShopItem } from '../types/Shop';
import { IUserUpdate, IUser } from '../types/User';
import { setHeaders } from '../utilities/axios';

const BASE_URL = '/v1/shop/';

export interface IShopService {
  buyItem(item: number): Promise<IShopItem>;
  getItems(): Promise<IShopItem[]>;
}

export default class ShopService implements IShopService {
  constructor(private _axios: any) {}

  async buyItem(itemId: number): Promise<IShopItem> {
    const res = await this._axios.post(
      `${BASE_URL}/`,
      { itemId },
      setHeaders(),
    );
    return res.data;
  }

  async getItems(): Promise<IShopItem[]> {
    const res = await this._axios.get(`/v1/items/`, setHeaders());
    return res.data;
  }
}
