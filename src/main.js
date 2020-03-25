// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'; 
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.axios = axios;
Vue.use(VueResource)
console.log(store)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {

  //获取用户登录成功后储存的登录标志
  let getFlag = localStorage.getItem("Flag");

  //如果登录标志存在且为isLogin，即用户已登录
  if(getFlag === "isLogin"){

    //设置vuex登录状态为已登录
    store.state.isLogin = true
    next()

    //如果已登录，还想进入登录界面，则定向回个人中心
    if (to.path === "/login") {
      alert("进入我的订单，而不是登录界面")
      next({
        path: '/account',
      })
    }

  //如果登录标志不存在，即未登录
  }else{
    //用户想进入需要登录的页面，则定向回登录界面
    if(to.meta.isLogin){
      next({
        path: '/login',
      })
      alert('请先登录');
      
    //用户进入无需登录的界面，则跳转继续
    }else{
      next()
    }

  }

});

router.afterEach(route => {
  window.scroll(0, 0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})