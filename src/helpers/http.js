import { store } from '../redux/store';

const baseUrl = 'http://197.243.52.214/api';
const { user } = store.getState().userData;
export default class Http {
  static async fetch(url, configs = {}) {
    if (configs.body) {
      configs = { ...configs, body: JSON.stringify(configs.body) };
    }
    const info = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
        ...configs.headers,
      },
      ...configs,
    };
    return await fetch(url, info).then(async (res) => ({
      status: res.status,
      body: await res.json(),
    }));
  }

  static async get(endpoint = '') {
    return await this.fetch(`${baseUrl}/${endpoint}`);
  }

  static async post(endpoint = '', data = {}) {
    return await this.fetch(`${baseUrl}/${endpoint}`, {
      body: data,
      method: 'POST',
    });
  }
}
