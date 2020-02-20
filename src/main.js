// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'; 
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(axios);
Vue.use(VueResource)
console.log(store)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})