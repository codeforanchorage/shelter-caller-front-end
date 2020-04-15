import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

function getUserFromJWT(token){
    if (!token) return
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const data = JSON.parse(window.atob(base64));
    return data.user
}

export default new Vuex.Store({
  state: {
    loggedIn: false,
    token: undefined,
    roles: [],
    user: undefined
  },
  mutations: {
    setLoggedIn(state, loggedIn){
        state.loggedIn = loggedIn
    },
    setUser(state, user){
        state.uesr = user
    },
    setRoles(state, roles){
        state.roles = roles
    },
    setToken(state, token){
        state.token = token
    }
  },
  actions: {
    login({commit}, {user, password }){
        const apiURL = `${process.env.VUE_APP_API_URL}admin_login/`
        return axios.post(apiURL, {user, password} )
        .then(r => {
            if(r.data.jwt){
                let {jwt, roles} = r.data
                commit('setToken', jwt)
                localStorage.setItem('token', jwt)
                
                const user = getUserFromJWT(jwt)
                commit('setUser', user)

                localStorage.setItem('roles', JSON.stringify(roles))
                commit('setRoles', roles)

                commit('setLoggedIn', true)
            }
        })
    },
    logOut({commit}){
        localStorage.removeItem('token')
        localStorage.removeItem('roles')
        commit('setLoggedIn', false)
        commit('setToken', undefined)
        commit('setRoles', [])
        commit('setUser', undefined)
        router.push('/Login')
    },
    setLoginFromToken({commit}) {
        const token = localStorage.getItem('token')
        if (!token) return

        commit('setToken', token)

        const user = getUserFromJWT(token)
        commit('setUser', user)

        const roles = JSON.parse(localStorage.getItem('roles'))
        if (roles) {
            commit('setRoles', roles)
        }
        // should test token expires here, but it's not urgent
        // the api will send 401 on expired 
        commit('setLoggedIn', true)
    }
  },
  getters: {
      isLoggedIn: state => state.loggedIn,
      token: state => state.token,
      roles: state => state.roles,
      hasRole: state => role => state.roles.includes(role)
  }
})
