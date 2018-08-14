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
  LOAD_TAG_FEED_REQUEST: null,
  LOAD_TAG_FEED_SUCCESS: null,
  LOAD_TAG_FEED_ERROR: null,
  LOAD_ARTICLE_REQUEST: null,
  LOAD_ARTICLE_SUCCESS: null,
  LOAD_ARTICLE_ERROR: null,
  ADD_COMMENT_REQUEST: null,
  ADD_COMMENT_SUCCESS: null,
  ADD_COMMENT_ERROR: null
}, glue, 'ARTICLE');

export const TAG = keyMirror({
  LOAD_POPULAR_TAGS_REQUEST: null,
  LOAD_POPULAR_TAGS_SUCCESS: null,
  LOAD_POPULAR_TAGS_ERROR: null
}, glue, 'TAG');
