<template>
    <!-- There's a current pull request on vue for a router-link disabled flag which will all removing the reproduced code -->
    <router-link tag="div" class="call" v-if="data && hasRole('admin')"  :to="{name: 'callhistory', params:{shelterid: data.id}}">
        <h4>{{data.name}}</h4>
        <circlecount :percent="percent" :data="data"></circlecount>
        <div class='calldata'>
            <span v-if="data.personcount">No. in Shelter: {{data.personcount}}</span><br />
            {{percent}}<br />
            Reported: {{data.time | toDate}}
        </div>
    </router-link>
    <div v-else class="call disabled">
        <h4>{{data.name}}</h4>
        <circlecount :percent="percent" :data="data"></circlecount>
        <div class='calldata'>
            <span v-if="data.personcount">No. in Shelter: {{data.personcount}}</span><br />
            {{percent}}<br />
            Reported: {{data.time | toDate}}
        </div>
    </div>
</template>
<script>
import circlecount from '@/components/CircleCount.vue'
import {allowedRoles} from '../mixins/auth_mixins'

export default {
    name: "shelterCount",
    props:['data'],
    components:{circlecount},
    mixins:[allowedRoles],
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
            if (this.data.bedcount == null) return ""
            console.log(this.data.name, this.data.bedcount, this.data.capacity)
            return this.data.bedcount < 0 
            ? "100% capacity"
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
.call.disabled:hover{
    cursor: auto;
    background-color: white;
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
