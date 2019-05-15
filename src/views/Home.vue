<template>
<div>
 <div id="content"  v-if="loaded">
    <h2><font-awesome-icon class="arrow" icon="step-backward" v-on:click="dayback" /><span id="currentDate">{{date}}</span> <font-awesome-icon v-if="tomorrow" class="arrow" icon="step-forward" v-on:click="dayforward" /> </h2>
    <div id="calls">
      <div v-for="count in counts" v-bind:key="count.name">
        <sheltercount :data='count' :day='date' @newcount="updateshelter"></sheltercount>
      </div>
    </div>
    <div>
        <barchart></barchart>        
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
import barchart from '@/components/BarChart.vue'
import sheltercount from '@/components/ShelterCount.vue'
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
    barchart
  },
  methods:{
      dayforward(){
          this.datestring = this.tomorrow
          this.$router.push({ name: 'counthistory', params: { datestring: this.tomorrow } })
      },
      dayback(){
          this.datestring = this.yesterday
          this.$router.push({ name: 'counthistory', params: { datestring: this.yesterday } })
      },
      getcalls(){
        axios.get(`${process.env.VUE_APP_API_URL}counts/${this.datestring}`)
        .then(res => {
            this.counts = res.data.counts
            this.date = res.data.date
            this.yesterday = res.data.yesterday
            this.tomorrow = res.data.tomorrow
            this.loaded = true
        })
        .catch(() => this.error = "Error loading network data")
      },
      updateshelter(e){
          let shelter = this.counts.find(c => c.id === e.shelterID)
          shelter.bedcount = e.bedcount
          shelter.personcount = e.personcount
      }
  },
  mounted: function(){
      this.datestring = this.$route.params.datestring
      this.getcalls()
  },
  watch: {
      '$route': function () {
          this.datestring = this.$route.params.datestring
          this.getcalls()
    }
  },

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
    #calls{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        border-bottom: 1px solid #eee;
        padding-bottom: 1em
    }
    
</style>

