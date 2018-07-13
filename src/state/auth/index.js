import { AUTH } from '../actionTypes';

const initialState = {
  userAuthInfo: {},
  errors: null,
  isLoading: false
};

export const authReducer = (state = initialState, action) => {
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
        isLoading: false
      };
    case AUTH.SIGN_IN_ERROR:
    case AUTH.REGISTER_ERROR:
      return {
        ...state,
        errors: action.errors,
        isLoading: false
      };
    default:
      return state;
  }
};

export const updateAuthField = (userAuthInfo) => ({
  type: AUTH.UPDATE_AUTH_FIELD,
  userAuthInfo
});

export const signInUser = (userInfo) => (dispatch, _, container) => {
  dispatch(signInUserRequest);

  return container.signInUser(userInfo, {
    onSuccess: (user) => dispatch(signInUserSuccess(user)),
    onError: (error) => dispatch(signInUserError(error.errors))
  });
}

const signInUserRequest = {
  type: AUTH.SIGN_IN_REQUEST
};

const signInUserSuccess = (user) => ({
  type: AUTH.SIGN_IN_SUCCESS,
  success: true,
  user
});

const signInUserError = (errors) => ({
  type: AUTH.SIGN_IN_ERROR,
  success: false,
  errors
});

export const registerUser = (userAuthInfo) => (dispatch, _, container) => {
  dispatch(registerUserRequest);

  return container.registerUser(userAuthInfo, {
    onSuccess: (user) => dispatch(registerUserSuccess(user)),
    onError: (error) => dispatch(registerUserError(error.errors))
  });
}

const registerUserRequest = {
  type: AUTH.REGISTER_REQUEST
};

const registerUserSuccess = (user) => ({
  type: AUTH.REGISTER_SUCCESS,
  success: true,
  user
});

const registerUserError = (errors) => ({
  type: AUTH.REGISTER_ERROR,
  success: false,
  errors
});
