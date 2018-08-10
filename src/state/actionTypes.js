/* @flow */
import keyMirror from 'keymirror-nested';

const glue = '/';

export const AUTH = keyMirror({
  SIGN_IN_REQUEST: null,
  SIGN_IN_SUCCESS: null,
  SIGN_IN_ERROR: null,
  REGISTER_REQUEST: null,
  REGISTER_SUCCESS: null,
  REGISTER_ERROR: null,
  UPDATE_AUTH_FIELD: null
}, glue, 'AUTH');

export const ARTICLE = keyMirror({
  LOAD_GLOBAL_FEED_REQUEST: null,
  LOAD_GLOBAL_FEED_SUCCESS: null,
  LOAD_GLOBAL_FEED_ERROR: null,
  LOAD_USER_FEED_REQUEST: null,
  LOAD_USER_FEED_SUCCESS: null,
  LOAD_USER_FEED_ERROR: null,
}, glue, 'ARTICLE');
