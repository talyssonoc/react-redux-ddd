/* @flow */
import Vue from 'vue'
import Vuex from 'vuex'
import * as container from '@rw-ddd/core';

import { feed } from './article';
import tags from './tags';

Vue.use(Vuex);

const injectContainer = (store) => {
  store.app = container;
};

export default new Vuex.Store({
  modules: {
    feed,
    tags
  },
  plugins: [ injectContainer ]
});
