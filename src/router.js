import Vue from 'vue'
import VueRouter from 'vue-router'

import Hello from '@/components/Hello.vue'
import Signin from '@/components/Signin.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Hello
    },
    {
      path: '/signin',
      component: Signin
    }
  ]
})

export default router
