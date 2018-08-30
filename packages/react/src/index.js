import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '@rw-ddd/core/infra/serviceWorker/registerServiceWorker';
import * as cache from '@rw-ddd/core/infra/cache';
import * as container from '@rw-ddd/core/container';
import Application from './view/Application';
import createStore from './state/store';
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
