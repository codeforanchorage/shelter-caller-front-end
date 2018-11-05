<template>
    <div>
    <canvas ref="the_canvas" width="170" height="150"></canvas>
    </div>
</template>

<script>
export default {
    props:['data'],
    data(){
        return {
            ctx: null,
        }
    },
    methods:{
        draw(){
            let countText = this.data.bedcount == null ? '-' : this.data.bedcount
            let stop =  this.data.bedcount == null ? 0: (this.data.capacity - this.data.bedcount)/this.data.capacity

            let w = this.$refs['the_canvas'].width
            let h = this.$refs['the_canvas'].height
            this.ctx.clearRect(0, 0, w, h );
            this.ctx.fillStyle = "#666";
            this.ctx.beginPath();
            this.ctx.arc(w/2, h/2, 50, 0, Math.PI * 2, true);
            this.ctx.fill();
            this.ctx.fillStyle = "#ccc"
            this.ctx.font = 'bold 48px Roboto, sans-serif';
            this.ctx.textAlign="center"; 
            this.ctx.fillText(countText, w / 2, h / 2 + 12);
            var red = this.ctx.createLinearGradient(0,0,0,100);
            red.addColorStop(1, 'lightgrey');
            red.addColorStop(0, 'dimgrey');

            this.ctx.strokeStyle = red
            this.ctx.lineWidth = 9
            this.ctx.beginPath();
            this.ctx.arc(w/2, h/2, 54,  Math.PI ,  Math.PI + 2 * Math.PI * stop, false )
            this.ctx.stroke()

        }
    },
    mounted: function(){
      this.ctx = this.$refs['the_canvas'].getContext('2d')
      this.$refs['the_canvas'].width  = this.$refs['the_canvas'].parentElement.clientWidth
      this.$refs['the_canvas'].height = this.$refs['the_canvas'].parentElement.clientHeight
      this.draw()
    } , 
    watch:{
        data: function(newData){
            this.draw()
        }
    } 
}
</script>
