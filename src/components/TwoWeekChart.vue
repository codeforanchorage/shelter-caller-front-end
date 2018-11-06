
<script>
import axios from 'axios'
import { Bar } from 'vue-chartjs'
export default {
    extends: Bar,
    data() {
        return {
            daysback: 0,
            data:{}
        }
    },
    methods:{ 
        getcalls(){
        return axios.get(`${process.env.VUE_APP_API_URL}counthistory/${this.daysback}/`)
        .then(res => {
            this.data.labels = res.data.dates
            let shelters = res.data.shelters

            shelters.forEach((item, i, self) => {
                let hue = 360 * i/self.length 
                item.backgroundColor = `hsl(${hue},20%,70%)`
            })
            this.data.datasets = shelters
        })
      }
    },
    mounted () {
       // Overwriting base render method with actual data.
       const options =  { maintainAspectRatio: false, 
                          scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }
       
       this.getcalls()
       .then(() => this.renderChart(this.data, options))
    },
    created(){
        
    }
}
</script>

<style scoped>

</style>
