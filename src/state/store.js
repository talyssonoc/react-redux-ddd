import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authReducer as auth } from './auth';

const reducer = combineReducers({
  auth
});

export default (container) => (
  createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(container))
    )
  )
);
