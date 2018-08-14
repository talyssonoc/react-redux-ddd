/* @flow */
import Axios, { type AxiosXHRConfigBase } from 'axios';
import type { User } from '../../domain/user';

const API_URL: string = process.env.REACT_APP_API_URL || '';

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

type Options = $Shape<AxiosXHRConfigBase<any, any>>;

export const post = (url: string, data?: mixed, options?: Options) => axios.post(url, data, options);

export const get = (url: string, options?: Options) => axios.get(url, options);

export const authGet = (url: string, user: User, options: Options = {}) =>
  get(url, withUserToken(options, user));

export const authPost = (url: string, user: User, data?: mixed = {}, options?: Options = {}) =>
  post(url, data, withUserToken(options, user));

const withUserToken = (options: Options, user: User): Options => ({
  ...options,
  headers: {
    ...options.headers,
    Authorization: `Token ${user.token}`
  }
});
