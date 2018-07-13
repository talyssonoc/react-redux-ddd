import keyMirror from 'keymirror-nested';

export const actionTypes = keyMirror({
  SIGN_IN_REQUEST: null,
  SIGN_IN_SUCCESS: null,
  SIGN_IN_ERROR: null,
  REGISTER_REQUEST: null,
  REGISTER_SUCCESS: null,
  REGISTER_ERROR: null,
  UPDATE_AUTH_FIELD: null
}, '/', 'AUTH');

const initialState = {
  user: {},
  errors: null,
  isLoading: false
};

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_AUTH_FIELD:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user
        }
      };
    case actionTypes.SIGN_IN_REQUEST:
    case actionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: null
      };
    case actionTypes.SIGN_IN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoading: false
      };
    case actionTypes.SIGN_IN_ERROR:
    case actionTypes.REGISTER_ERROR:
      return {
        ...state,
        errors: action.errors,
        isLoading: false
      };
    default:
      return state;
  }
};

export const updateAuthField = (user) => ({
  type: actionTypes.UPDATE_AUTH_FIELD,
  user
});

export const signInUser = (userInfo) => (dispatch, _, container) => {
  dispatch(signInUserRequest);

  return container.signInUser(userInfo, {
    onSuccess: (user) => dispatch(signInUserSuccess(user)),
    onError: (error) => dispatch(signInUserError(error.errors))
  });
}

const signInUserRequest = {
  type: actionTypes.SIGN_IN_REQUEST
};

const signInUserSuccess = (user) => ({
  type: actionTypes.SIGN_IN_SUCCESS,
  success: true,
  user
});

const signInUserError = (errors) => ({
  type: actionTypes.SIGN_IN_ERROR,
  success: false,
  errors
});

export const registerUser = (userInfo) => (dispatch, _, container) => {
  dispatch(registerUserRequest);

  return container.registerUser(userInfo, {
    onSuccess: (user) => dispatch(registerUserSuccess(user)),
    onError: (error) => dispatch(registerUserError(error.errors))
  });
}

const registerUserRequest = {
  type: actionTypes.REGISTER_REQUEST
};

const registerUserSuccess = (user) => ({
  type: actionTypes.REGISTER_SUCCESS,
  success: true,
  user
});

const registerUserError = (errors) => ({
  type: actionTypes.REGISTER_ERROR,
  success: false,
  errors
});
