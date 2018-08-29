/* @flow */
import type { Dispatch, Reducer } from 'redux';
import type { User } from '@rw-ddd/core/domain/user';
import typeof * as Container from '@rw-ddd/core/container';
import type { GetState } from '../store';
import withCurrentUser from '../withCurrentUser';
import { AUTH, USER } from '../actionTypes';

export const UserStatuses = {
  INIT: 'INIT',
  SIGNING: 'SIGNING',
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT'
};

export type UserStatus = $Keys<typeof UserStatuses>;

export type UserState = {
  user: ?User,
  status: UserStatus
};

const initialState = {
  user: null,
  status: UserStatuses.INIT
};

export const userReducer: Reducer<UserState, any> = (state = initialState, action) => {
  switch(action.type) {
    case AUTH.SIGN_IN_SUCCESS:
    case AUTH.REGISTER_SUCCESS:
    case USER.UPDATE_SETTINGS_SUCCESS:
    case USER.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        status: UserStatuses.SIGNED_IN
      };

    case AUTH.SIGN_OUT_USER:
      return {
        ...state,
        user: null,
        status: UserStatuses.SIGNED_OUT
      };

    case USER.LOAD_USER_REQUEST:
      return {
        ...state,
        status: UserStatuses.SIGNING
      };

    case USER.LOAD_USER_ERROR:
    case USER.SET_USER_SIGNED_OUT:
      return {
        ...state,
        status: UserStatuses.SIGNED_OUT
      };

    default:
      return state;
  }
};

export const loadUser = () => {
  return (dispatch: Dispatch<any>, getState: GetState, container: Container) => {
    const state = getState();

    if(!state.user.user) {
      return dispatch(setUserSignedOut);
    }

    dispatch(loadUserRequest);

    container.getUser(withCurrentUser(state), {
      onSuccess: (user) => dispatch(loadUserSuccess(user)),
      onError: (error) => dispatch(loadUserError)
    });
  };
};

const loadUserRequest = {
  type: USER.LOAD_USER_REQUEST
};


const loadUserSuccess = (user) => ({
  type: USER.LOAD_USER_SUCCESS,
  user
});

const loadUserError = {
  type: USER.LOAD_USER_ERROR,
};

const setUserSignedOut = {
  type: USER.SET_USER_SIGNED_OUT
};
