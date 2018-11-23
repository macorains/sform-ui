import Vue from 'vue'
import VueRouter from 'vue-router'

import Hello from '@/components/Hello.vue'
import Signin from '@/components/Signin.vue'
import FormList from '@/components/FormList.vue'
import FormEdit from '@/components/FormEdit.vue'

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
    },
    {
      path: '/formlist',
      component: FormList
    },
    {
      path: '/formedit',
      component: FormEdit
    }
  ]
})

export default router
