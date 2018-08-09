import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authReducer as auth } from './auth';
import { userReducer as user } from './user';

import {
  globalFeed,
  userFeed
} from './article';

const reducer = combineReducers({
  auth,
  user,
  globalFeed: globalFeed.globalFeedReducer,
  userFeed: userFeed.userFeedReducer
});

export default ({ container, initialState }) => (
  createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(container))
    )
  )
);
