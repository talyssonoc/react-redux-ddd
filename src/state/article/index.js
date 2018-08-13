/* @flow */
import type { Article } from '../../domain/article';
import * as article from './article';
import * as globalFeed from './globalFeed';
import * as userFeed from './userFeed';

export type { ArticleState } from './article';

export type FeedState = {|
  articles: Array<Article>,
  isLoading: bool,
  error: ?Error
|};

export {
  article,
  globalFeed,
  userFeed
};
