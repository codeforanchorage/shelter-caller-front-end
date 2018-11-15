<template>
    <div class="back">
        <div id="confirm" v-bind:class="{showconfirm: showConfirm}">
                Delete {{shelter.name}} and all its call history?<br />
                <button  v-on:click="deleteshelter"><font-awesome-icon class="card-control" icon="trash-alt" />Delete</button>  <button v-on:click="canceldelete">Cancel</button>
        </div>
        <form ref="shelteredit" id="shelteredit" @submit.prevent="handleSubmit">
            <input type="hidden" name="id" v-model="shelter.id" />
            <div class="formgroup">
                <font-awesome-icon icon="home" class="formicon" /><input v-model.trim="shelterCopy.name" name="name" placeholder="Shelter Name" required>
            </div>
            <div class="formgroup">
                <font-awesome-icon icon="phone" class="formicon" /> <the-mask mask="+1 (###) ###-####" v-model="shelterCopy.phone" type="tel" name="phone" placeholder="+1 (907) 555-1212" required pattern="\+1\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}"></the-mask>
            </div>
            <div class="formgroup">
                <font-awesome-icon icon="id-card" class="formicon" /> <input v-model.trim="shelterCopy.login_id" name="login_id" placeholder="login id" required pattern="[0-9]+">
                <font-awesome-icon icon="bed" class="formicon" /> <input v-model.trim="shelterCopy.capacity" name="capacity" placeholder="capacity" pattern="[0-9]+">
            </div>
        
        <div class="formFooter">
            <font-awesome-icon v-on:click="flip" class="card-control" icon="undo" />
            <button type="submit"> <font-awesome-icon  class="card-control" icon="save" /></button>
            <font-awesome-icon v-on:click="confirmdelete" class="card-control" icon="trash-alt" />
            <input v-model.trim="shelterCopy.active" name="active" type="checkbox" > Active
        </div>
        </form>
    </div>
</template>

<script>
    import axios from "axios"
    import {TheMask} from 'vue-the-mask' // https://vuejs-tips.github.io/vue-the-mask/

    export default {
        props:['shelter'],
        data(){
            return {
                shelterCopy:{},
                showConfirm: false
            }
        },
        methods:{
            flip(){
                this.$emit("cardflipped")
                this.shelterCopy = Object.assign({}, this.shelterCopy, this.shelter)
            },
            confirmdelete(){
                this.showConfirm = true
            },
            deleteshelter(){
                axios.get(`${process.env.VUE_APP_API_URL}delete_shelter/${this.shelterCopy.id}`)
                .then(res => {
                    if (res.data.result === "success"){
                        this.$emit("delete")
                    }
                })

            },
            canceldelete(){
                this.showConfirm = false
            },
            handleSubmit(){
                var data = new FormData();
                Object.entries(this.shelterCopy).forEach(([key, value]) => data.append(key, value))
                this.save(data)
            },
            save(data){
                axios.post(`${process.env.VUE_APP_API_URL}update_shelter/`, data)
                .then(res => {
                    if (res.data.result){
                        Object.keys(this.shelter).forEach(key => this.$set(this.shelter, key, this.shelterCopy[key]) )
                        this.flip()
                    }
                })
            }
        },
        components: {TheMask},
        mounted: function(){
            // make a copy of the shelter data in case we revert back
            this.shelterCopy = Object.assign({}, this.shelterCopy, this.shelter)
        }
    }
</script>

<style scoped>
    .formFooter button{    
        margin: 0;
        font-size: 1em;
        padding: 0;
        background: none;
        width: 2em;
    }
    #confirm{
        padding: 1em;
        position: absolute;
        top: 100%;
        background-color:#f59999;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        z-index: 10;
        text-align: center;
        color:white;
        font-weight: 400;
        transition: top .5s;
        text-transform: uppercase;
        font-size:1em;
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
    #confirm.showconfirm{
        top: 0;
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
        position:absolute;
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
