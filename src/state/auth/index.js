/* @flow */
import type { Dispatch, Reducer } from 'redux';
import typeof * as Container from '../../container';
import type { User, UserAuthInfo } from '../../domain/user';
import { AUTH } from '../actionTypes';

export type AuthState = {|
  userAuthInfo: UserAuthInfo,
  errors: ?Object,
  isLoading: bool
|};

const initialState: AuthState = {
  userAuthInfo: {},
  errors: null,
  isLoading: false
};

export const authReducer: Reducer<AuthState, any> = (state = initialState, action) => {
  switch(action.type) {
    case AUTH.UPDATE_AUTH_FIELD:
      return {
        ...state,
        userAuthInfo: {
          ...state.userAuthInfo,
          ...action.userAuthInfo
        }
      };
    case AUTH.SIGN_IN_REQUEST:
    case AUTH.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: null
      };
    case AUTH.SIGN_IN_SUCCESS:
    case AUTH.REGISTER_SUCCESS:
      return {
        ...state,
        userAuthInfo: {},
        isLoading: false
      };
    case AUTH.SIGN_IN_ERROR:
    case AUTH.REGISTER_ERROR:
      return {
        ...state,
        userAuthInfo: {
          ...state.userAuthInfo,
          password: null
        },
        errors: action.errors,
        isLoading: false
      };
    default:
      return state;
  }
};

export const updateAuthField = (userAuthInfo: UserAuthInfo) => ({
  type: AUTH.UPDATE_AUTH_FIELD,
  userAuthInfo
});

export const signInUser = (userInfo: UserAuthInfo) => {
  return (dispatch: Dispatch<any>, _: any, container: Container) => {
    dispatch(signInUserRequest);

    return container.signInUser(userInfo, {
      onSuccess: (user) => dispatch(signInUserSuccess(user)),
      onError: (error) => dispatch(signInUserError(error.errors))
    });
  };
}

const signInUserRequest = {
  type: AUTH.SIGN_IN_REQUEST
};

const signInUserSuccess = (user: User) => ({
  type: AUTH.SIGN_IN_SUCCESS,
  user
});

const signInUserError = (errors) => ({
  type: AUTH.SIGN_IN_ERROR,
  errors
});

export const registerUser = (userAuthInfo: UserAuthInfo) => {
  return (dispatch: Dispatch<any>, _: any, container: Container) => {
    dispatch(registerUserRequest);

    return container.registerUser(userAuthInfo, {
      onSuccess: (user) => dispatch(registerUserSuccess(user)),
      onError: (error) => dispatch(registerUserError(error.errors))
    });
  };
}

const registerUserRequest = {
  type: AUTH.REGISTER_REQUEST
};

const registerUserSuccess = (user: User) => ({
  type: AUTH.REGISTER_SUCCESS,
  user
});

const registerUserError = (errors) => ({
  type: AUTH.REGISTER_ERROR,
  errors
});
