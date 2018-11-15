<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
    import navbar from '@/components/NavBar.vue'
    export default {
        name: 'app',
        components: {
            navbar
        }
    }

</script>
   
<style>
body{
    margin:0px;
    background-color: whitesmoke
}

#app {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: whitesmoke

}

</style>
