import keyMirror from 'keymirror-nested';

export const AUTH = keyMirror({
  SIGN_IN_REQUEST: null,
  SIGN_IN_SUCCESS: null,
  SIGN_IN_ERROR: null,
  REGISTER_REQUEST: null,
  REGISTER_SUCCESS: null,
  REGISTER_ERROR: null,
  UPDATE_AUTH_FIELD: null
}, '/', 'AUTH');
