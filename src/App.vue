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
}

#app {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
