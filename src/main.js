// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
// import router from './router'
import router from './router.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

const data = require('./message.json')
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'ja',
  messages: data
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n: i18n,
  router: router,
  template: '<App/>',
  components: { App }
})
