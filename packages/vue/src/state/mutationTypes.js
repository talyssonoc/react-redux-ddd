import keyMirror from 'keymirror-nested';

const glue = '/';

export const FEED = keyMirror({
  LOAD_GLOBAL_FEED: null,
  LOAD_GLOBAL_FEED_REQUEST: null,
  LOAD_GLOBAL_FEED_SUCCESS: null,
  LOAD_GLOBAL_FEED_ERROR: null
}, glue, 'FEED');

export const TAG = keyMirror({
  LOAD_POPULAR_TAGS: null,
  LOAD_POPULAR_TAGS_REQUEST: null,
  LOAD_POPULAR_TAGS_SUCCESS: null,
  LOAD_POPULAR_TAGS_ERROR: null
}, glue, 'TAG');
