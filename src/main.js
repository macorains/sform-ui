// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Toasted from 'vue-toasted'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router.js'
import Axios from './axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$http = Axios
Vue.use(BootstrapVue)
Vue.use(Toasted)
Vue.config.productionTip = false

const data = require('./message.json')
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'ja',
  messages: data
})

Vue.config.errorHandler = function (e, vm, info) {
  console.log('*** error ***')
  console.log(e)
  console.log(vm)
  console.log(info)
  return false
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n: i18n,
  router: router,
  components: { App },
  template: '<App/>'
})
