<template>
<div>
 <div id="content"  v-if="loaded">
    <h2><font-awesome-icon class="arrow" icon="step-backward" v-on:click="dayback" /><span id="currentDate">{{date}}</span> <font-awesome-icon v-if="daysback" class="arrow" icon="step-forward" v-on:click="dayforward" /> </h2>
    <div id="calls">
      <div v-for="count in counts" v-bind:key="count.name">
        <sheltercount :data='count'></sheltercount>
      </div>
    </div>
    <div id="twoWeek">
        <h4>Two Week Available Spaces</h4>
        <div id="barScroll">     
            <div id="bars">
            <twoweekchart :height="300" :width="800" ></twoweekchart>
            </div>
        </div>
    </div>
 </div>
 <div v-else id =loading>
    <h3>
        loading data
    </h3>
    <div v-if="error" id="errorText">
        <font-awesome-icon icon="exclamation-circle"></font-awesome-icon> {{error}}
    </div>
</div>
 </div>
</template>

<script>
// @ is an alias to /src
import sheltercount from '@/components/ShelterCount.vue'
import twoweekchart from '@/components/TwoWeekChart.vue'
import axios from 'axios'

export default {
  name: 'home',
  data(){
      return {
          counts:[],
          date:'', 
          daysback: 0,
          loaded:false,
          error:undefined
      }
  },
  components: {
    sheltercount,
    twoweekchart
  },
  methods:{
      dayforward(){
          this.daysback--
          this.getcalls()
      },
      dayback(){
          this.daysback++
          this.getcalls()
      },
      getcalls(){
        axios.get(`${process.env.VUE_APP_API_URL}calls/${this.daysback}`)
        .then(res => {
            this.counts = res.data.counts
            this.date = res.data.date
            this.loaded = true
        })
        .catch(() => this.error = "Error loading network data")
      }
  },
  created: function(){
      this.getcalls()
  }
}
</script>
<style scoped>
    
    #currentDate{
        margin-left:.5em;
        margin-right:.5em;
    }
    h2{
        text-align: center;
        background-color: dimgray;
        color: whitesmoke;
        padding: .125em;
        margin-top: 0;
        font-size: 1.25em;
        text-transform: uppercase;

    }
    #loading{
        text-align: center;
        color: #ddd;
    }
    #errorText{
        color: coral;
    }
    .arrow:hover{
        color:lightgrey;
        cursor: pointer;
        
    }
    
    #twoWeek h4{
        padding: 0 1em;
    }
    #barScroll{
        width: 100%;
        overflow: scroll;
        min-height: 500px;
    }
    #bars {
        width: 100%;
        height: 300px;
        min-width: 700px;
    }
    #calls{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        border-bottom: 1px solid #eee;
        padding-bottom: 1em
    }
    
</style>

