import axios from 'axios';

export default axios.create({
  baseURL: 'http://197.243.52.214:81/api/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
});
