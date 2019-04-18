<template>
    <nav class="toolbar">
        <div class="toolbar_content">
           <div class="nav_title">Bed<b>Count</b></div>
            <div class="space"></div>
            <div class="navlink" v-if="loggedin">
                <router-link :to="{name: 'home'}">Counts <font-awesome-icon icon="chart-bar" /></router-link>
            </div>
            <div class="navlink" v-if="loggedin && hasRole('admin')">
                <router-link :to="{name: 'shelters'}">Shelters <font-awesome-icon icon="bed" /> </router-link>
            </div>
            <div class="navlink" v-if="loggedin && hasRole('admin')">
                <router-link :to="{name: 'preferences'}">Prefs <font-awesome-icon icon="cogs" /> </router-link>
            </div>
            <div class="navlink" v-if="loggedin">
                 <a @click="signout">sign out <font-awesome-icon icon="sign-out-alt" /></a>
            </div>
        </div>
    </nav>
</template>
<script>
    import {allowedRoles} from '../mixins/auth_mixins'
    export default {
        name: 'navbar',
        props: {
            msg: String
        },
        mixins:[allowedRoles],
        methods: {
            signout(){
                this.$root.signOut()
                this.$router.push('/Login')
            }
        }
    }
</script>
<style scoped>
    .toolbar{
        border-bottom: 1px solid #eee;
        margin: 0px;
    }
    .toolbar_content{
        display: flex;
        padding: 10px 1em;
        height: 3em;
        text-transform: uppercase;
        align-items: center;
    }
    .nav_title{
        font-size: 24px;
        text-overflow: ellipsis;
    }
    .nav_title b{
        color: coral
    }
    .space{
        flex-grow: 1;
    }
    a{
        flex: 0 0 auto;
        text-decoration: none;
        text-transform: uppercase;
        vertical-align: middle;
        color: #333;
    }
    a:hover{
        color:#ccc;
    }
    .navlink{
        font-size: 1.2em;
        margin-left: 1em;
    }
    
</style>
