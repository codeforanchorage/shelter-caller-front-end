import Vue from 'vue'
import App from './App.vue'
import router from './router'
import auth from './auth'
import axios from 'axios'

/* Install font-awesome icons */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBed, faCogs, faEdit, faChartBar, faIdCard, faPhone, faHome, faUndo, faSave, faTrashAlt, faStepForward, faStepBackward, faExclamationCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([faBed, faCogs, faEdit, faChartBar, faIdCard, faPhone, faHome, faUndo, faSave, faTrashAlt, faStepForward, faStepBackward, faExclamationCircle, faSignOutAlt])
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

axios.interceptors.request.use(function(config) {
    if (auth.token ) config.headers.Authorization = `Bearer ${auth.token}`
    return config
    }, function(err) {
        return Promise.reject(err);
    })  

axios.interceptors.response.use(null, function (error) {
    console.log("in interceptor.response", error)
    if (error.response.status === 403 || error.response.status === 401) {
        console.log('Failed to login')
        router.push('/Login')
    }
    return Promise.reject(error)
    })

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !auth.loggedIn) {
        next({ path: '/login' })
    } else {
        next()
    }
})

new Vue({
  data: {
      loggedIn: auth.loggedIn
  },
  methods:{
    signOut(){
        this.loggedIn = false
        auth.logOut()
    },
    signIn(){
        this.loggedIn = true
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
