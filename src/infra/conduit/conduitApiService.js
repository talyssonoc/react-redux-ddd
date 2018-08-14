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

type AuthRequestWithoutData = (string, User, Options) => Promise<any>;
type AuthRequestWithData = (string, User, mixed, Options) => Promise<any>;

export const post = axios.post;

export const get = axios.get;

const del = axios.delete;

export const authGet: AuthRequestWithoutData = (url, user, options = {}) =>
  get(url, withUserToken(options, user));

export const authPost: AuthRequestWithData = (url, user, data = {}, options = {}) =>
  post(url, data, withUserToken(options, user));

export const authDel: AuthRequestWithoutData = (url, user, options = {}) =>
  del(url, withUserToken(options, user));

const withUserToken = (options: Options, user: User): Options => ({
  ...options,
  headers: {
    ...options.headers,
    Authorization: `Token ${user.token}`
  }
});
