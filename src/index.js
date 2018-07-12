import React from 'react';
import ReactDOM from 'react-dom';
import Application from './view/Application';
import createStore from './state/store';
import * as container from './container';
import registerServiceWorker from './infra/serviceWorker/registerServiceWorker';

const store = createStore(container);

ReactDOM.render(<Application store={ store } />, document.getElementById('root'));
registerServiceWorker();
