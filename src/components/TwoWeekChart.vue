
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
    methods:{ //TODO fix api call so data is in an eaier format
        getcalls(){
        return axios.get(`${process.env.VUE_APP_API_URL}callhistory/${this.daysback}/`)
        .then(res => {
            this.data.labels = Object.keys(res.data)
            let shelters = Object.values(res.data).reduce((shelters, dateArray) =>{
                dateArray.forEach(entry => {
                    if (!shelters.hasOwnProperty(entry.name))
                        shelters[entry.name] = this.data.labels.map(() => null)
                })
                return shelters
            }, {})

            Object.values(res.data).forEach((item, i) => {
                item.forEach((entry) => {
                    shelters[entry.name][i] = entry.lastcall.count
                })
            })

            //this.data = res.data   
            this.data.datasets = Object.entries(shelters).map(([shelter, array], i, self) => {
                let hue = 360 * i/self.length 
                return {label: shelter, backgroundColor:`hsl(${hue},20%,70%)`, data: array} 
            })
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
