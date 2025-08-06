import axios from 'axios';
import { CSRF_TOKEN, API_BASE_URL } from '~/config/app';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});


axiosInstance.defaults.headers.common.Accept = 'application/json';
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

export default class HttpInstance {
  static httpInstance = axiosInstance;

  static current() {
    return this.httpInstance;
  }

  static csrf(csrfToken: string) {
    this.httpInstance.defaults.headers.common[CSRF_TOKEN] = csrfToken;
    return this.httpInstance;
  }

  static login(token: string, csrfToken: string) {
    this.httpInstance.defaults.headers.common.Authorization = 'Bearer ' + token;
    this.httpInstance.defaults.headers.common[CSRF_TOKEN] = csrfToken;
    return this.httpInstance;
  }

  static logout() {
    this.httpInstance.defaults.headers.common.Authorization = undefined;
    return this.httpInstance;
  }
}

export function httpJson(csrfToken: string) {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // ✅ ADD
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [CSRF_TOKEN]: csrfToken,
    },
  });
  return instance;
}

export function httpAuth(token: string, csrfToken: string) {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // ✅ ADD
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      [CSRF_TOKEN]: csrfToken,
    },
  });
  return instance;
}
