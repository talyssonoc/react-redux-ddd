import keyMirror from 'keymirror-nested';

export const actionTypes = keyMirror({
  SIGN_IN_REQUEST: null,
  SIGN_IN_SUCCESS: null,
  SIGN_IN_ERROR: null,
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
      return {
        ...state,
        isLoading: true,
        errors: null
      };
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoading: false
      };
    case actionTypes.SIGN_IN_ERROR:
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
