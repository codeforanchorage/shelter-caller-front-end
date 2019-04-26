
<script>
import { Bar } from 'vue-chartjs'
export default {
    extends: Bar,
    props: ['data'],
    watch:{
        data: function(){
            this.renderChart(this.data, this.options)
        }
    },
    data() {
        return {
            daysback: 0,
            options: { 
                maintainAspectRatio: false, 
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
            }   
    }
}
</script>

<style scoped>

</style>
