<!--
   This is the form the is used when a new shelter is added.
-->
<template>
    <div class="new-shelter">

        <form ref="shelteredit" id="shelteredit" @submit.prevent="handleSubmit">
            <input type="hidden" name="id" v-model="shelter.id" />
            <div class="formgroup">
                <font-awesome-icon icon="home" class="formicon" /><input v-model.trim="shelter.name" name="name" placeholder="Shelter Name" required>
            </div>
            <div class="formgroup">
                <font-awesome-icon icon="phone" class="formicon" /> <the-mask mask="+1 (###) ###-####" v-model="shelter.phone" type="tel" name="phone" placeholder="+1 (907) 555-1212"  pattern="\+1\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}"></the-mask>
            </div>
            <div class="formgroup">
                <font-awesome-icon icon="id-card" class="formicon" /> <input v-model.trim="shelter.login_id" name="login_id" placeholder="login id" required pattern="[0-9]+">
                <font-awesome-icon icon="bed" class="formicon" /> <input v-model.trim="shelter.capacity" name="capacity" placeholder="capacity" pattern="[0-9]+">
            </div>
        
        <div class="formFooter">
            <button type="submit"> <font-awesome-icon  class="card-control" icon="save" /></button>
            <font-awesome-icon v-on:click="cancel" class="card-control" icon="trash-alt" />
            <input v-model.trim="shelter.active" name="active" type="checkbox" checked> Active
        </div>
        </form>
    </div>
</template>

<script>
    import axios from "axios"
    import {TheMask} from 'vue-the-mask'

    export default {
        props:['visible'],
        data(){
            return {
                shelter:{},
            }
        },
        methods:{
            cancel(){
                this.shelter = {}
                this.$emit('cancel')
            },
            
            handleSubmit(){
                var data = new FormData();
                Object.entries(this.shelter).forEach(([key, value]) => data.append(key, value))
                this.save(data)
            },
            save(data){    
                axios.post(`${process.env.VUE_APP_API_URL}update_shelter/`, data)
                .then(res => {
                       this.$emit('newshelter',res.data)
                       this.shelter = {}
                })
            }
        },
        components: {TheMask},
    }
</script>

<style scoped>
    #shelteredit{
        border: 1px solid #ddd;
    }
    .new-shelter{
        position: relative;
        width: 20em;
        border: 1px solid #efefef;
        border-radius: 5px;
        margin: .5em;
        margin-left: .5em;
    }
    .formFooter button{    
        margin: 0;
        font-size: 1em;
        padding: 0;
        background: none;
        width: 2em;
    }
    
    button{
        border: none;
        text-transform: uppercase;
        padding: .5em;
        margin: 1em;
        border-radius: 2px;
        font-size: .65em;
        width:50%;
        outline: none;
    }
    
    input{
        padding: 10px;
        outline: none;
        background-color: #f6f6f6;
        border: none;
        flex-grow: 1;
        flex-shrink: 1;
        min-width: 20%;
        font-size: .875em;
    }
    input:invalid{
        background-color:#f5dfe2;
    }
    .formicon{
        width: 2em;
        background-color: #efefef;
        padding: 10px 2px;
        text-align: center;
    }
    .formgroup{
        margin-bottom: .2em;
        display: flex;
    }
    .formFooter{  
        bottom:0px;
        margin-bottom:0px;
        padding: .4em 1em;
        background-color: #efefef;
        width: 100%;
        box-sizing: border-box;
    }
    .card-control{
        margin-right: .75em;
    }
    .card-control:hover{
       color:coral;
       cursor: pointer;
    }

    .back{
        overflow: hidden;
    }
</style>
