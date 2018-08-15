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
  LOAD_ARTICLE_REQUEST: null,
  LOAD_ARTICLE_SUCCESS: null,
  LOAD_ARTICLE_ERROR: null,
  UNLOAD_ARTICLE: null,
  ADD_COMMENT_REQUEST: null,
  ADD_COMMENT_SUCCESS: null,
  ADD_COMMENT_ERROR: null,
  REMOVE_COMMENT_REQUEST: null,
  REMOVE_COMMENT_SUCCESS: null,
  REMOVE_COMMENT_ERROR: null,
  CREATE_ARTICLE_REQUEST: null,
  CREATE_ARTICLE_SUCCESS: null,
  CREATE_ARTICLE_ERROR: null
}, glue, 'ARTICLE');

export const FEED = keyMirror({
  LOAD_GLOBAL_FEED_REQUEST: null,
  LOAD_GLOBAL_FEED_SUCCESS: null,
  LOAD_GLOBAL_FEED_ERROR: null,
  LOAD_USER_FEED_REQUEST: null,
  LOAD_USER_FEED_SUCCESS: null,
  LOAD_USER_FEED_ERROR: null,
  LOAD_TAG_FEED_REQUEST: null,
  LOAD_TAG_FEED_SUCCESS: null,
  LOAD_TAG_FEED_ERROR: null
}, glue, 'FEED');

export const EDITOR = keyMirror({
  UPDATE_FIELD: null,
  ADD_TAG: null,
  REMOVE_TAG: null,
  RESET: null
}, glue, 'EDITOR');

export const TAG = keyMirror({
  LOAD_POPULAR_TAGS_REQUEST: null,
  LOAD_POPULAR_TAGS_SUCCESS: null,
  LOAD_POPULAR_TAGS_ERROR: null
}, glue, 'TAG');
