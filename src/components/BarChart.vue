<template>
    <div id="twoWeek">
        <h4>Two Week Available Spaces</h4>
        <p class="chartAverages">Filter: 
            <span v-bind:class="{selected: !filter_set}" @click="filterData()">All</span> | 
            <span v-bind:class="{selected: filter_set == 'adult_general'}" @click="filterData('adult_general')">Adult General Shelters</span> 
        </p>
        <p class="chartAverages">Average Open Spaces: Past 14 Days: {{two_week_average.toFixed(0)}} | Past 7 Days: {{one_week_average.toFixed(0)}}</p>
        
        <div id="barScroll">     
            <div id="bars">
                <twoweekchart :height="300" :width="800" :data="data"></twoweekchart>
            </div>
        </div>
    </div>

</template>
<script>
import twoweekchart from '@/components/TwoWeekChart.vue'
import axios from 'axios'


export default {
    components: {
        twoweekchart
    },
    data() {
        return {
            daysback: 0,
            origin_data:{},
            filter_set: undefined,
            filter_sets: {
                adult_general:["Bean's ECWS", "Brother Francis Shelter",  "Anchorage Gospel Rescue Mission", "Downtown Hope Center"]
            }
        }
    },
    computed:{
        data(){ 
            return this.filter_set && this.filter_sets[this.filter_set]
            ? { labels: this.origin_data.labels,
                datasets: this.origin_data.datasets.filter(item => this.filter_sets[this.filter_set].includes(item.label) )
              }
            : this.origin_data
            
        },
        two_week_average(){
            return this.data.datasets
            ? this.data.datasets.reduce((sum, {data} ) => sum + data.reduce((sum, n) => sum + (n > 0 ? n : 0) ), 0) / 14
            : 0
        },
        one_week_average(){
            return this.data.datasets
            ? this.data.datasets.reduce((sum, {data} ) => sum + data.slice(7).reduce((sum, n) => sum + (n > 0 ? n : 0) ), 0) / 7
            : 0
        }
    },
    methods:{ 
        filterData(set){
            this.filter_set = set
        },
        getcalls(){
        return axios.get(`${process.env.VUE_APP_API_URL}counthistory/${this.daysback}/`)
        .then(res => { 
            res.data.shelters.forEach((item, i, self) => {
                let hue = 360 * i/self.length 
                item.backgroundColor = `hsl(${hue},20%,70%)`
                item.data = item.data.map(n => n < 0 ? 0 : n)
            })
            this.origin_data = {
                labels: res.data.dates,
                datasets: res.data.shelters
            }
        })
      }
    },
    mounted () {
        this.getcalls() 
    }
}
</script>
<style scoped>
    p.chartAverages{
        padding: 0 1.25em;
        margin:0;
        font-size: .9em;
        line-height: 170%;
        color: #444;
    }
    p.chartAverages span:hover{
        cursor: pointer;
        color:lightslategrey;
    }
    p.chartAverages span.selected{
        font-weight: bold;
    }
    #twoWeek{
        padding: 0 1em;
    }
    #twoWeek h4{
        padding: 0 1em;
        margin-bottom: .5em;
    }
    #twoWeek h5{
        padding: 0 1.1em;
        margin-top: 0em;
        color: #444;
        font-weight: normal;

    }
    #barScroll{
        width: 100%;
        overflow: scroll;
        min-height: 500px;
        margin-top: 2em;
    }
    #bars {
        width: 100%;
        height: 300px;
        min-width: 700px;
    }
</style>
