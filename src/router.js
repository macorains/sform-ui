import Vue from 'vue'
import VueRouter from 'vue-router'

import Hello from '@/components/Hello.vue'
import Signin from '@/components/Signin.vue'
import FormList from '@/components/FormList.vue'
import FormEdit from '@/components/FormEdit.vue'
import Admin from '@/components/admin/Admin.vue'
import Help from '@/components/help/Help.vue'
import DataView from '@/components/dataview/DataView.vue'
import CreateAdmin from '@/components/CreateAdmin.vue'
import CodeInput from '@/components/CodeInput.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  mode: 'history',
  routes: [{
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
    name: 'formedit',
    component: FormEdit
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/help',
    name: 'help',
    component: Help
  },
  {
    path: '/dataview',
    name: 'dataview',
    component: DataView
  },
  {
    path: '/createadmin',
    name: 'createadmin',
    component: CreateAdmin
  },
  {
    path: '/codeinput',
    name: 'codeinput',
    component: CodeInput
  }
  ]
})

export default router
