<template>
    <div class="card">
        <div class="flip" v-bind:class="{ flipped: isFlipped }" >
            <div class = "front">
                <slot name="front"></slot>  
                <div class="footer">
                    <slot name="frontfooter"></slot>
                </div>     
            </div>
            <div class="back">
                <slot name="back"></slot>
                <div class="footer">
                     <slot name="backfooter"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            isFlipped: {
                default: false,
                type: Boolean
            }
        },
        methods: {          
            back(){ 
                this.$emit("showBack", this)        
            },
            front(){
                this.$emit("showFront", this)
            }
        }  
    }
</script>
<style scoped>    
    .card {
        perspective: 1000px;
        transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;

        display: inline-block;
    }
    /* these need to be flipped independently for IE */
    .flipped .back{
        transform: rotateY(0deg);
    }
    .flipped .front{
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
        display:flex;
        transition: 0.6s;
        transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        flex-direction: column;
        justify-content:space-between;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        top: 0;
        left: 0;
        border: 1px solid #ddd;
        border-radius: 10px;
        background-color: white;
    }
    .footer{
        background-color:#efefef;
    }
    .front {
        position: relative;
        transform: rotateY(0deg);
    }
    .back {
        transform: rotateY(-180deg);
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        bottom: 0;
    }
</style>
