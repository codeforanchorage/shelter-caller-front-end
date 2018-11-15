import Vue from 'vue'
import App from './App.vue'
import router from './router'

/* Install font-awesome icons */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBed, faCogs, faEdit, faChartBar, faIdCard, faPhone, faHome, faUndo, faSave, faTrashAlt, faStepForward, faStepBackward, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([faBed, faCogs, faEdit, faChartBar, faIdCard, faPhone, faHome, faUndo, faSave, faTrashAlt, faStepForward, faStepBackward, faExclamationCircle])
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
