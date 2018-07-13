import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authReducer as auth } from './auth';
import { userReducer as user } from './user';

const reducer = combineReducers({
  auth,
  user
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
