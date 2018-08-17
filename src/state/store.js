/* @flow */
import {
  createStore,
  applyMiddleware,
  combineReducers,
  type CombinedReducer,
  type Store as ReduxStore
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import typeof * as Container from '../container';
import { authReducer as auth, type AuthState } from './auth';
import { userReducer as user, type UserState } from './user';
import { popularTagsReducer as popularTags, type PopularTagsState } from './tag';

import {
  feed,
  article,
  editor,
  type FeedState,
  type ArticleState,
  type EditorState
} from './article';

type State = {|
  auth: AuthState,
  user: UserState,
  popularTags: PopularTagsState,
  article: ArticleState,
  feed: FeedState,
  editor: EditorState
|};

export type Store = ReduxStore<State, *, *>;

export type GetState = $PropertyType<Store, 'getState'>;

type Dependencies = {
  container: Container,
  initialState: State
};

const reducer: CombinedReducer<State, any> = combineReducers({
  auth,
  user,
  popularTags,
  article: article.articleReducer,
  feed: feed.feedReducer,
  editor: editor.editorReducer
});

export default ({ container, initialState }: Dependencies): Store => (
  createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(container))
    )
  )
);
