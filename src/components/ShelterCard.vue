<template>
    <div class="card card-flip">
        <div class="flip" v-bind:class="{ flipped: isFlipped }" >
            <div class = "front" v-bind:class="{ inactive: !shelter.active }">
                <h3><font-awesome-icon v-if="!shelter.visible" class="hIcon" icon="eye-slash" /> {{shelter.name}} </h3>
                <div class="cardText">
                    <div><font-awesome-icon icon="info" /> {{shelter.description}}</div>
                    <div><font-awesome-icon icon="phone" /> {{shelter.phone | phone}} </div>
                    <div><font-awesome-icon icon="id-card" /> {{shelter.login_id}} <font-awesome-icon icon="bed" style="margin-left:.4em" /> {{shelter.capacity}}</div>
                </div>
                <p class="cardFooter">
                    <font-awesome-icon v-on:click="flip"  class="card-control" icon="edit" /> 
                   
                </p>
            </div>
            <shelterform class="back" :shelter="shelter" @cardflipped="flip" @delete="deleteshelter">
           
            </shelterform>
        </div>
    </div>
</template>
<script>
    import shelterform from '@/components/ShelterForm.vue'
    export default {
        props:['shelter'],
        data(){
            return{
                isFlipped: false
            }
        },
        methods: {
            flip(){
                this.isFlipped = !this.isFlipped
            },
            deleteshelter(){
                this.$emit('delete', this.shelter)
            }
        },
        components:{
            shelterform
        },
        filters:{
            phone:function(value){
               return value
                  ? `+1 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`
                  : "No number — will not be called"
            }
        }
    }
</script>
<style scoped>
    h3{
        margin:0px;
        padding: .4em 1em;
        background-color: #efefef;
        font-weight: 300;
        font-size: 1.25em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    h3 .hIcon{
        font-size: .8em;
        font-weight: 100;
    }
    .inactive {
        opacity: .25;
    }
    .flip{
        
        border: 1px solid #ddd;
        margin: .5em;
        min-width: 16em;
        border-radius: 5px;
        width:20em;
    }
    .cardText{
        margin-top:.5em;
        padding: 0em 1em;
        line-height: 200%;
    }
    .cardText div {
       white-space: nowrap;
       text-overflow: ellipsis;
       overflow: hidden;
    }
    .cardText svg{
       width: 1.5em;
    }
    .cardFooter{
        margin-bottom:0px;
        padding: .4em 1em;
        background-color: #efefef;
    }
    .card-control{
        margin-right: 1em;
    }
    .card-control:hover{
        color:coral;
        cursor: pointer;
    }
    .card-flip {
        perspective: 1000px;
    }
    .flipped {
        transform: rotateY(180deg);
    }
  
    .flip {
        transition: 0.6s;
        transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        position: relative;
    }

    .front, .back {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        top: 0;
        left: 0;
        background-color: #fdfdfd;
    }
    
    .front {
        z-index: 2;
        transform: rotateY(0deg);
    }
    .back {
        transform: rotateY(180deg);
        position: absolute;
        width: 100%;
        height: 100%;
    }

</style>
