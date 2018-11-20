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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
        path: '/shelters',
        name: 'shelters',
        component: () => import(/* webpackChunkName: "shelters" */ './views/Shelters.vue')
    },
    {
        path:'/callhistory/:shelterid',
        name: 'callhistory',
        component: CallHistory
    }
  ]
})
