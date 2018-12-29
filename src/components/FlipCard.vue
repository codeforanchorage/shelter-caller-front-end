<template>
    <div class="card card-flip">
        <div class="flip" v-bind:class="{ flipped: isFlipped }" >
            <div class = "front">
                <div class="slotcontent">
                    <slot name="front"></slot>  
                </div> 
                <div class="cardFooter">
                    <font-awesome-icon v-on:click="flip"  class="card-control" icon="edit" /> 
                </div>     
            </div>
            <div class="back"  @cardflipped="flip">
                <div class="slotcontent">
                    <slot name="back"></slot>
                </div>
                <div class="cardFooter">
                     <font-awesome-icon v-on:click="flipAndEmit" class="card-control" icon="undo" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:[],
        data(){
            return{
                isFlipped: false
            }
        },
        methods: {          
            flip(){         
                this.isFlipped = !this.isFlipped
            },
            flipAndEmit(){
                this.$emit("cardflipped")
                this.isFlipped = !this.isFlipped
            }
        }
        
    }
</script>
<style scoped>
  
    .flip{      
        border: 1px solid #ddd;
        margin: .5em;
        min-width: 16em;
        border-radius: 5px;
        width:25em;
    }
    .slotcontent{
        padding: 1em;
        padding-bottom: 2.5em;
    }
    .cardFooter{
        position: absolute;
        box-sizing: border-box;
        margin-bottom:0px;
        height: 2em;
        bottom: 0px;
        width: 100%;
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
    .cardFooter button{
        border: none;
        text-transform: uppercase;
        background-color: Transparent;
        font-size: 1em;
        width:3em;
        outline: none;
    }
</style>
