import { AUTH } from '../actionTypes';

export const userReducer = (state = null, action) => {
  switch(action.type) {
    case AUTH.SIGN_IN_SUCCESS:
    case AUTH.REGISTER_SUCCESS:
      return action.user;
    default:
      return state;
  }
};
