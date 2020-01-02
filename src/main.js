// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router1 from './router/index_no_sync'
// import router2 from './router/index'
import router from './router'
import _ from 'underscore'
import Config from './config'
import store from './store/store'

// 全局引入element-ui
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

Vue.use(ElementUI);

Vue.config.productionTip = false

// 请求后台数据资源跨域在config下index.js

import axios from "axios";

Vue.prototype.$axios = axios;



// axios.defaults.headers.post['Content-type'] = 'application/json'

// axios.interceptors.request.use(
//   config => {
//     let token = localStorage.getItem("settings").token;
//     if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.token = `${token}`;
//     }
//     if (config.url.indexOf(url) === -1) {
//       config.url = url + config.url; /*拼接完整请求路径*/
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });

// 引入公共样式
import "@/assets/common.css"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
})
