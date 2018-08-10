/* @flow */
import Axios, { type AxiosXHRConfigBase } from 'axios';

const API_URL: string = process.env.REACT_APP_API_URL || '';

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export const post = (url: string, options: ?AxiosXHRConfigBase<any, any>) => axios.post(url, options);

export const get = (url: string, options: ?AxiosXHRConfigBase<any, any>) => axios.get(url, options);

export const authGet = (url, user, options = {}) => get(url, {
  ...options,
  headers: {
    ...options.headers,
    Authorization: `Token ${user.token}`
  }
});
