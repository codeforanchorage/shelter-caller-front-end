<template>
    <div id="twoWeek">
        <h4>Two Week Available Spaces </h4>
        <h5>Average open spaces: Past 14 days: {{two_week_average.toFixed(0)}} | Past 7 days: {{one_week_average.toFixed(0)}}</h5>
        
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
            data:{},
            two_week_average: 0,
            one_week_average: 0,
        }
    },
    methods:{ 
        getcalls(){
        return axios.get(`${process.env.VUE_APP_API_URL}counthistory/${this.daysback}/`)
        .then(res => {
            
            res.data.shelters.forEach((item, i, self) => {
                let hue = 360 * i/self.length 
                item.backgroundColor = `hsl(${hue},20%,70%)`
                item.data = item.data.map(n => n < 0 ? 0 : n)
            })
            this.two_week_average = res.data.shelters
            .reduce((sum, {data} ) => sum + data.reduce((sum, n) => sum + (n > 0 ? n : 0) ), 0) / 14

            this.one_week_average = res.data.shelters
            .reduce((sum, {data} ) => sum + data.slice(7).reduce((sum, n) => sum + (n > 0 ? n : 0) ), 0) / 7


            this.data = {
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
    }
    #bars {
        width: 100%;
        height: 300px;
        min-width: 700px;
    }
</style>
