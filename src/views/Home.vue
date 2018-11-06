<template>
 <div id="content">
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
          daysback: 0
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
        })
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
        color: #eee;
        padding: .25em;
        margin-top: 0;
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

