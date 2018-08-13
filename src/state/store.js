/* @flow */
import { createStore, applyMiddleware, combineReducers, type CombinedReducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import typeof * as Container from '../container';
import { authReducer as auth, type AuthState } from './auth';
import { userReducer as user, type UserState } from './user';
import { popularTagsReducer as popularTags, type PopularTagsState } from './tag';

import {
  globalFeed,
  userFeed,
  type FeedState
} from './article';

type State = {|
  auth: AuthState,
  user: UserState,
  popularTags: PopularTagsState,
  globalFeed: FeedState,
  userFeed: FeedState
|};

type Dependencies = {
  container: Container,
  initialState: State
};

export type GetState = () => State;

const reducer: CombinedReducer<State, any> = combineReducers({
  auth,
  user,
  popularTags,
  globalFeed: globalFeed.globalFeedReducer,
  userFeed: userFeed.userFeedReducer
});

export default ({ container, initialState }: Dependencies) => (
  createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(container))
    )
  )
);
