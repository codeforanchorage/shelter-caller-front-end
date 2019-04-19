
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
                item.data = item.data.map(n => n < 0 ? 0 : n)
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
                          },
                          legend: {
                            onClick: function(e, legendItem){
                                let ch = this.chart
                                let current_meta = ch.getDatasetMeta(legendItem.datasetIndex)
                                ch.data.datasets.forEach((d, i) => {
                                    if (i != legendItem.datasetIndex){
                                        if (current_meta.hidden == false)
                                            ch.getDatasetMeta(i).hidden = !ch.getDatasetMeta(i).hidden
                                        else
                                            ch.getDatasetMeta(i).hidden =true
                                    }
                                })
                               current_meta.hidden = false
                                ch.update()
                            }
                          }
                        
                    }
       
       this.getcalls()
       .then(() => {this.renderChart(this.data, options); console.log(this.generateLegend());  })
    },
    created(){
    }
}
</script>

<style scoped>

</style>
