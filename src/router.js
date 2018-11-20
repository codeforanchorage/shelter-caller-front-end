import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CallHistory from './views/CallHistory.vue'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/shelters',
        name: 'shelters',
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "shelters" */ './views/Shelters.vue')
    },
    {
        path:'/callhistory/:shelterid',
        name: 'callhistory',
        meta: { requiresAuth: true },
        component: CallHistory
    }
  ]
})
