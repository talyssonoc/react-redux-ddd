/* @flow */
import type { Reducer } from 'redux';
import type { User } from '../../domain/user';
import { AUTH, USER } from '../actionTypes';

export type UserState = {
  user: ?User
};

const initialState = {
  user: null
};

export const userReducer: Reducer<UserState, any> = (state = initialState, action) => {
  switch(action.type) {
    case AUTH.SIGN_IN_SUCCESS:
    case AUTH.REGISTER_SUCCESS:
    case USER.UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};
