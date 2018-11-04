<template>
    <div class="call">
        <h4>{{data.name}}</h4>
      <!-- <div class="count">{{latestCall}}</div> -->
        <circlecount :count='latestCall' :data="data"></circlecount>
        <div class='calldata'>
            Reported:<br/>
            {{latestTime}}<br />
            {{percent}}
           
        </div>
        
    </div>
</template>
<script>
import circlecount from '@/components/CircleCount.vue'
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default {
    name: "shelterCount",
    props:['data'],
    components:{circlecount},
    computed:{
        latestCall(){
            return this.data.bedcount == null  // the api will respond with [null] if there are no calls
            ? "-"    
            : this.data.bedcount
             
        },
        latestTime(){
            if (this.data.bedcount == null) {
                return 'No Report' 
            }
            let d = new Date( this.data.time)
            let day = days[d.getDay()]
            let month = months[d.getMonth()]
            return `${day}, ${month} ${d.getDate()} - ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
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
    border: 1px solid #eee;
    text-align: center;
    border-radius: 10%;
    min-width: 10em;
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
