/* @flow */
import Axios, { type AxiosXHRConfigBase, type $AxiosError } from 'axios';
import type { User } from '../../domain/user';

const API_URL: string = process.env.REACT_APP_API_URL || '';

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

type Options = $Shape<AxiosXHRConfigBase<any, any>>;

type RequestWithoutData = (string, Options) => Promise<any>;
type RequestWithData = (string, User, mixed, Options) => Promise<any>;
type AuthRequestWithoutData = (string, User, Options) => Promise<any>;
type AuthRequestWithData = (string, User, mixed, Options) => Promise<any>;
type Request = RequestWithoutData | RequestWithData;

type ConduitError = Error & {
  errors: Object
};

const wrapErrorExtraction = (request: Request): any => async (...args) => {
  try {
    return await request(...args);
  } catch(error) {
    throw extractErrors(error);
  }
};

export const post = wrapErrorExtraction(axios.post);

export const get = wrapErrorExtraction(axios.get);

const del = wrapErrorExtraction(axios.delete);

export const authGet: AuthRequestWithoutData = (url, user, options = {}) =>
  get(url, withUserToken(options, user));

export const authPost: AuthRequestWithData = (url, user, data = {}, options = {}) =>
  post(url, data, withUserToken(options, user));

export const authDel: AuthRequestWithoutData = (url, user, options = {}) =>
  del(url, withUserToken(options, user));

type SuccessResponse = Object;

type FailureResponse = {
  errors: Object
};

type Response = SuccessResponse | FailureResponse;

const extractErrors = (ajaxError: $AxiosError<any, Response>) => {
  const error = ((new Error(): any): ConduitError);

  if(!ajaxError.response) {
    return ajaxError;
  }

  error.errors = ajaxError.response.data.errors;

  return error;
};

const withUserToken = (options: Options, user: User): Options => ({
  ...options,
  headers: {
    ...options.headers,
    Authorization: `Token ${user.token}`
  }
});
