import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

/* Install font-awesome icons */
import { library } from '@fortawesome/fontawesome-svg-core'
import {faClipboardList, faInfo, faBed, faCogs, faEdit, faChartBar, faIdCard, faPhone, faHome, faUndo, faSave, faTrashAlt, faStepForward, faStepBackward, faExclamationCircle, faSignOutAlt,faSignInAlt, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'

library.add([faClipboardList, faInfo, faBed, faCogs, faEdit, faChartBar, faIdCard, faPhone, faHome, faUndo, faSave, faTrashAlt, faStepForward, faStepBackward, faExclamationCircle, faSignOutAlt,faSignInAlt, faEyeSlash])
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

axios.interceptors.request.use(
    config => {
        if (store.getters.token ) config.headers.Authorization = `Bearer ${store.getters.token}`;
        return config
    }, err => {
        return Promise.reject(err);
    }
)

axios.interceptors.response.use(null, function (error) {
    if (error.response.status === 403 || error.response.status === 401) {
        router.push('/Login')
    }
    return Promise.reject(error)
})

router.beforeEach((to, from, next) => {
    /* to.matched is an array becuase it's possible to create nested routes. 
     * the array will be in parent->child order. So long as each leaf child has 
     * a allowed roles, we only need to check it. (moot at the moment because we're no nesting routes)
     */
    if (to.matched.some(record => record.meta.requiresAuth)){
         if(!store.getters.isLoggedIn) {
            next({ path: '/login' })
            return
         }
         if (!to.matched[to.matched.length - 1].meta.allowedRoles.some(role => store.getters.hasRole(role))){
            next({ path: '/login' })
            return
         }
    
        next()
    } else {
        next()
    }
})

// This need to happen outside the Vue instance lifecycle so it's in 
// place before the router guards above are running. 
store.dispatch('setLoginFromToken')

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
