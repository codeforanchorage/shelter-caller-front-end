<template>
    <!-- There's a current pull request on vue for a router-link disabled flag which will all removing the reproduced code -->
    <flipcard>
    <div slot="front" class="call" v-if="data" >
        <h4>{{data.name}}</h4>
        <circlecount :percent="percent" :data="data"></circlecount>
        <div class='calldata'>
            <div class="footer_links" v-if="data && hasRole('admin')" >
                 <font-awesome-icon v-on:click="flip"  class="card-control" icon="edit" /> <br />
                 <router-link  :to="{name: 'callhistory', params:{shelterid: data.id}}">
                    <font-awesome-icon v-on:click="flip"  class="card-control" icon="clipboard-list" /> 
                 </router-link>
            </div>
            <div class="footer_data">
                <span v-if="data.personcount">No. in Shelter: {{data.personcount}} <br /></span> 
                {{percent}}<br v-if="percent" />
                Reported: {{data.time | toDate}}
            </div>
        </div>
    </div>
    </flipcard>
    
</template>
<script>
import circlecount from '@/components/CircleCount.vue'
import flipcard from '@/components/FlipCard.vue'

import {allowedRoles} from '../mixins/auth_mixins'

export default {
    name: "shelterCount",
    props:['data'],
    components:{circlecount, flipcard},
    mixins:[allowedRoles],
    methods:{
        gotohistory(){
           // console.log(this.data.shelterID)
        },
        flip(){
            console.log("fliped")
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
            return this.data.bedcount < 0 
            ? "100% capacity"
            : (((this.data.capacity - this.data.bedcount)/ this.data.capacity) * 100).toFixed(2) + '% capacity'       
        }
    }
}
</script>
<style scoped>
a{
    color: dimgray;
}
.call{
    margin: 0 .5em .5em 0;
    padding: 0em 1em .5em 1em;
    border: 1px solid lightgray;
    text-align: center;
    border-radius: 10%;
    min-width: 10em;
    background-color: white;
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
    display: flex;
    min-height: 4em;
}
.footer_links{
    font-size: 1.4em;
    min-width: 1.6em;
    line-height: 140%;
}
.card-control:hover{
    color:coral;
    cursor: pointer;

}
</style>
