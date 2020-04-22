import axios from 'axios';

export default axios.create({
  baseURL: 'http://197.243.52.214:81/api/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
});

// export default class Http {
//   static async fetch(url, configs = {}, timeout = 7000) {
//     if (configs.body) {
//       configs = { ...configs, body: JSON.stringify(configs.body) };
//     }
//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${user.token}`,
//       ...configs.headers,
//     };
//     const info = {
//       method: 'GET',
//       mode: 'cors',
//       cache: 'no-cache',
//       headers,
//       ...configs,
//     };
//     const error = new Error('Unable to reach the server, request timeout');
//     return Promise.race([
//       fetch(url, info).then(async (res) => ({
//         status: res.status,
//         body: await res.json(),
//       })),
//       new Promise((_, reject) => setTimeout(() => reject(error), timeout)),
//     ]);
//   }

//   static async get(endpoint = '') {
//     return await this.fetch(`${baseUrl}/${endpoint}`);
//   }

//   static async post(endpoint = '', data = {}) {
//     return await this.fetch(`${baseUrl}/${endpoint}`, {
//       body: data,
//       method: 'POST',
//     });
//   }
// }
