/* @flow */
import type { Article } from '../../domain/article';
import * as article from './article';
import * as globalFeed from './globalFeed';
import * as userFeed from './userFeed';
import * as editor from './editor';

export type { ArticleState } from './article';
export type { EditorState } from './editor';

export type FeedState = {|
  articles: Array<Article>,
  isLoading: bool,
  error: ?Error
|};

export {
  article,
  globalFeed,
  userFeed,
  editor
};
