<template>
    <flipcard :isFlipped="isflipped" class="card">
        <div slot="front" class="call" v-if="data" >
            <h4>{{data.name}}</h4>
            <circlecount :capacity="data.capacity" :bedcount="data.bedcount"></circlecount>
            <div class='calldata'>        
                <div class="footer_data">
                    <span v-if="data.personcount">No. in Shelter: {{data.personcount}} <br /></span> 
                    {{percent}}<br v-if="percent" />
                    Reported: {{data.time | toDate}}
                </div>
            </div>
        </div>
        <div slot="frontfooter" class="cardFooter" v-if="hasRole('admin')">
            <font-awesome-icon v-on:click="isflipped = true"  class="card-control" icon="edit" />
            <router-link  :to="{name: 'callhistory', params:{shelterid: data.id}}">
                        <font-awesome-icon  class="card-control" icon="clipboard-list" /> 
            </router-link>
        </div>
        <div slot="back" class="call" v-if="hasRole('admin')">
            <h5>Edit Count <br />{{data.name}}</h5>
            <p v-if="!errorText">
                <b>Reported count: {{data.personcount || '-'}}</b><br>
                How many people were in the shelter this night?
            </p>
            <p v-else class="error">
                {{errorText}}
            </p>
            <div class="input_box">
                <input class="count_input" id="countinput" type="number" v-model="countInput" >
                <span class="focus-border"></span>
            </div>
            
        </div>
        <div slot="backfooter" class="cardFooter" v-if="hasRole('admin')">
            <font-awesome-icon v-on:click="flipCard()" class="card-control" icon="undo" />
            <font-awesome-icon v-on:click="saveCount()" class="card-control" icon="save" />
        </div>
    </flipcard>
    
</template>
<script>
import circlecount from '@/components/CircleCount.vue'
import flipcard from '@/components/FlipCard.vue'
import axios from "axios"

import {allowedRoles} from '../mixins/auth_mixins'

export default {
    name: "shelterCount",
    props:['data', 'day'],
    data(){
        return{
            isflipped: false,
            countInput: this.data.personcount,
            errorText: undefined,
            loading: false
        }
    },
    components:{circlecount, flipcard},
    mixins:[allowedRoles],
    methods:{
        flipCard(){
            this.countInput = this.data.personcount
            this.isflipped = false;
            this.errorText = undefined;
        },
        saveCount(){
            if (this.loading){
                return
            }
            this.loading = true
            let submited = {
                numberOfPeople:this.countInput,
                shelterID:this.data.id,
                day: this.day
            }
            axios.post(`${process.env.VUE_APP_API_URL}setcount/`, submited)
            .then(res => {
                this.loading = false
                if (!res.data.error) {
                    this.errorText = undefined;
                    this.$emit('newcount',res.data.counts)
                    this.flipCard()
                } else {
                    this.errorText = res.data.error
                }
            })
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
    },
    watch:{
        'data.personcount'(){
            this.countInput = this.data.personcount
        }
    }
}
</script>
<style scoped>

h5 {
    text-transform:uppercase;
}
.error {
    padding:.5em;
    border: 1px solid indianred;
    color:#333;
    font-weight: 300;
    font-size: .85em;
    border-radius: 5px;
}
a {
    color: dimgray;
}
.card {
    margin: .25em;
}
.call{
    margin: 0 .5em .5em 0;
    padding: 0em 1em .5em 1em;
    text-align: center;
    min-width: 10em;
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
.card-control{margin-left: .5em;}
.card-control:hover{
    color:coral;
    cursor: pointer;

}
.cardFooter{
    box-sizing: border-box;
    padding: .25em .5em;
}
.input_box{
    position: relative;
    margin-top:2em;
}
input {
    box-sizing: border-box;
    letter-spacing: 1px;
    width: 100%;
    padding: 4px;
    background-color: transparent;
    border:0;
    border-bottom: 1px solid #ddd;
    text-align: center;
    font-size: 3.5em;
    font-weight: 800;
    color:dimgray;
}
input:focus{
    outline: none;
}

.count_input ~ .focus-border{
    position: absolute; 
    bottom: 0; left: 0; width: 0; height: 2px; 
    background-color: coral;
    transition: 0.4s;
    }
.count_input:focus ~ .focus-border{
    width: 100%; transition: 0.4s;
    }
.count_input ~ label{
    position: absolute; 
    left: 0; width: 100%; top: 6px;
    color: #aaa; 
    transition: 0.3s;
    letter-spacing: 0.5px;
    z-index: -1;
    }
.count_input:focus ~ label{
    top: -16px; 
    font-size: 12px; 
    color: coral;
    transition: 0.3s;
    
     }
</style>
