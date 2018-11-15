<template>
  <div class="shelters">   
        <h1>Shelters</h1>
        <transition-group name="list" tag="div" class="shelterCards">
            <sheltercard :shelter="shelter"  v-for="shelter in shelters" v-bind:key="shelter.id" @delete="deleteshelter"></sheltercard>
        </transition-group>
        <div class="addshelter">
            <h2 v-on:click="togglevisible">
                <span v-if="newFormVisible">- Cancel</span>
                <span v-else>+ New Shelter</span>
            </h2>
            <transition name="fade">
                <newshelterform v-if="newFormVisible" @cancel="togglevisible" @newshelter="addshelter"></newshelterform>
            </transition>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import sheltercard from '@/components/ShelterCard.vue'
import newshelterform from '@/components/NewShelterForm.vue'

export default {
  name: 'Shelters',
  components: {
      sheltercard,
      newshelterform
  },
  data(){
       return {
           shelters:[],
           newFormVisible:false
       }
    },
    methods:{
        togglevisible(){
            this.newFormVisible = !this.newFormVisible
        },
        addshelter(s){
            this.shelters.push(s)
            this.shelters.sort((a, b) => a.name.localeCompare(b.name))
            this.newFormVisible = false
        },
        deleteshelter(shelter){
            this.shelters.splice(this.shelters.indexOf(shelter), 1)
        }
    },
    created: function () {
        axios.get(`${process.env.VUE_APP_API_URL}shelters/`)
        .then(res => this.shelters.push(...res.data))
    }
}
</script>
<style scoped>
    .hidden{
        display: none;
    }
    .shelters{
        padding: 0 1em;
    }
    .shelterCards{
        display: flex;
        flex-wrap: wrap;
    }
    h1{
        font-weight: 300;
        font-size: 2.5em;
    }
    
    .fade-enter-active, .fade-leave-active {
        transition: opacity .25s, transform .5s;
        
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity:0;
        transform: translateX(-1em);
    }
    
    .list-item {
        margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
        transition: all .5s; 
    }
    .list-leave-active{
        position:absolute;
    } 
    .list-move {
        transition: transform .5s;
    } 
    .list-enter, .list-leave-to  {
        opacity: 0;
        transform: translateY(-30px);
    }
    .addshelter h2:hover{
        color:coral;
        cursor: pointer;

    }
    
</style>
