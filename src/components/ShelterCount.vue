<template>
    <router-link tag="div" class="call" v-if="data" :to="{name: 'callhistory', params:{shelterid: data.id}}">
        <h4>{{data.name}}</h4>
        <circlecount :percent="percent" :data="data"></circlecount>
        <div class='calldata'>
            No. in Shelter: {{data.personcount}}<br />
            Reported: {{data.time | toDate}}<br />
            {{percent}}
        </div>
    </router-link>
</template>
<script>
import circlecount from '@/components/CircleCount.vue'
// const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default {
    name: "shelterCount",
    props:['data'],
    components:{circlecount},
    methods:{
        gotohistory(){
            console.log(this.data.shelterID)
        }
    },
    filters:{
        toDate: function(value){
            if(!value) return "No Report"
            let d = new Date(value)
            return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`

        }
    },
    computed:{
        latestCall(){
            return this.data.bedcount == null  // the api will respond with [null] if there are no calls
            ? "-"    
            : this.data.bedcount
             
        },
        percent(){
            return this.data.bedcount == null 
            ? "-"
            : (((this.data.capacity - this.data.bedcount)/ this.data.capacity) * 100).toFixed(2) + '% capacity'       
        }
    }
}
</script>
<style scoped>
.call{
    margin: 0 .5em .5em 0;
    padding: 0em 1em .5em 1em;
    border: 1px solid lightgray;
    text-align: center;
    border-radius: 10%;
    min-width: 10em;
    background-color: white;
    }
.call:hover{
    background-color: #ddd;
    cursor: pointer;
}
.count{
    width: 2em;
    height: 2em;
    border-radius: 50%;
    background-color: dimgray;
    text-align: center;
    font-size: 3em;
    /* padding: .25em 0; */
    line-height: 1.9em;
    color: lightgray;
    font-weight: 600;
    margin: auto;
}
.calldata{
    text-transform: uppercase;
    font-size: .75em;
    color:dimgray;
    text-align: left;
    margin-top:1.5em;
    line-height: 120%;
}
</style>
