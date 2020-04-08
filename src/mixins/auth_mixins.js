import auth from '../auth'

export const allowedRoles = {
    methods: {
        hasRole(roles){
           return auth.roles && auth.roles.some(role => roles.includes(role))
        }
    },
    computed:{
        loggedin() {
            return this.$root.loggedIn
        }
    }
}
