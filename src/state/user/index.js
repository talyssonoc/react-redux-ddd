/* @flow */
import type { Reducer } from 'redux';
import type { User } from '../../domain/user';
import { AUTH } from '../actionTypes';

export type UserState = ?User;

export const userReducer: Reducer<UserState, any> = (state = null, action) => {
  switch(action.type) {
    case AUTH.SIGN_IN_SUCCESS:
    case AUTH.REGISTER_SUCCESS:
      return action.user;
    default:
      return state;
  }
};
