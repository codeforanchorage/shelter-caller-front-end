import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CallHistory from './views/CallHistory.vue'
import Login from '@/views/Login'
import Prefs from '@/views/Prefs'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: false },
      component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
      path: '/history/:datestring',
      name: 'counthistory',
      meta: { requiresAuth: false },
      component: Home
    },
    {
        path: '/shelters',
        name: 'shelters',
        meta: { requiresAuth: true,  allowedRoles:['admin'] },
        component: () => import(/* webpackChunkName: "shelters" */ './views/Shelters.vue')
    },
    {
        path:'/callhistory/:shelterid',
        name: 'callhistory',
        meta: { requiresAuth: true,  allowedRoles:['admin'] },
        component: CallHistory
    },
    {
        path:'/prefs',
        name: 'preferences',
        meta: {requiresAuth: true,  allowedRoles:['admin'] },
        component: Prefs
    }
  ]
})
