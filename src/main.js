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
    if (auth.token ) config.headers.Authorization = `Bearer ${auth.token}`;
    return config
    }, function(err) {
        return Promise.reject(err);
    })  

axios.interceptors.response.use(null, function (error) {
    if (error.response.status === 403 || error.response.status === 401) {
        router.push('/Login')
    }
    return Promise.reject(error)
    })

router.beforeEach((to, from, next) => {
    console.log("to", to.matched)
    /* to.matched is an array becuase it's possible to create nested routes. 
     * the array will be in parent->child order. So long as each leaf child has 
     * a allowed roles, we only need to check it. (moot at the moment because we're no nesting routes)
     */
    if (to.matched.some(record => record.meta.requiresAuth)){
         if(!auth.loggedIn) {
            next({ path: '/login' })
            return
         }
         console.log(auth.roles, to.matched[to.matched.length - 1].meta.allowedRoles)
         if (!to.matched[to.matched.length - 1].meta.allowedRoles.some(role => auth.roles.includes(role))){
            next({ path: '/login' })
            return
         }
    
        next()
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
