import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { userReducer as user } from './user';

const reducer = combineReducers({
  user
});

export default (container) => (
  createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(container))
    )
  )
);
