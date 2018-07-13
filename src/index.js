import React from 'react';
import ReactDOM from 'react-dom';
import Application from './view/Application';
import createStore from './state/store';
import * as container from './container';
import registerServiceWorker from './infra/serviceWorker/registerServiceWorker';
import * as cache from './infra/cache';
import throttle from 'lodash.throttle';

const store = createStore({
  container,
  initialState: cache.getCachedState()
});

store.subscribe(throttle(() => {
  cache.cacheState(store.getState());
}, 1000));

ReactDOM.render(<Application store={ store } />, document.getElementById('root'));
registerServiceWorker();
