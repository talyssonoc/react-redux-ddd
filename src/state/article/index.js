/* @flow */
import type { Article } from '../../domain/article';
import * as globalFeed from './globalFeed';
import * as userFeed from './userFeed';

export type FeedState = {|
  articles: Array<Article>,
  isLoading: bool,
  error: ?Error
|};

export {
  globalFeed,
  userFeed
};
