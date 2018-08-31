import '@babel/polyfill';
import Vue from 'vue'
import Application from './view/Application.vue'
import router from './view/router'
import store from './state/store'
import './registerServiceWorker'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(Application)
}).$mount('#app');
