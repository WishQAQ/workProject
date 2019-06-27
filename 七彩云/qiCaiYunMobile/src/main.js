// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import apiConfig from '../config/api.config'

import Axios from 'axios'
import VueAxios from 'vue-axios'


import qs from 'qs'

Vue.use(VueAxios, Axios ,qs)
Axios.defaults.baseURL = 'api'
Axios.defaults.baseURL = apiConfig.baseUrl

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



