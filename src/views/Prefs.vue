<template>
  <div id="prefs" v-if="loaded">   
        <h1>Preferences </h1>
        <flipcard @cardflipped="saveData">
            <div slot="front">
                <b>Timezone: {{prefs.timezone}}</b>
                <p class="instruction">
                    All times will be interpreted as local to this zone.<br> It should be a zone from the <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">tz database list</a> such as "America/Anchorage".
                </p>
            </div>
            <div slot="back">
                <label for="timezone">Set Timezone: </label><br />
                <input id="timezone" name="timezone" v-model="prefs.timezone">
            </div>
        </flipcard>
        <flipcard @cardflipped="saveData">
            <div slot="front">
                <b>Start of Day: {{prefs.start_day | AMPM}}</b>
                <p class="instruction">
                   All input after this time will be counted toward the following day
                </p>
            </div>
            <div slot="back">
                <label for="start_day">Start of day: </label>
                <input id="start_day" name="start_day" type="time" class="time" v-model="prefs.start_day" required>

            </div>
        </flipcard>
       <flipcard @cardflipped="saveData">
            <div slot="front">
                <b>Start/Stop Times: {{prefs.enforce_hours ? "Enabled" : "Disabled"}}</b><br>
                Open: {{prefs.open_time | AMPM}} — Close: {{prefs.close_time | AMPM}} 
                <p class="instruction">
                   If enabled, input from calls and texts will only be accepted between open and close times
                </p>
            </div>
            <div slot="back">
                <div class="controls">
                <div id ="switch">
                    <div class="onoffswitch">
                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" v-model="prefs.enforce_hours">
                        <label class="onoffswitch-label" for="myonoffswitch">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                        </label>
                    </div>
                </div>
                <div class="times">
                    <label for="open_time">open</label><br>
                    <input id="open_time" class="time" type="time" name="open_time"  v-model="prefs.open_time" required>
                </div>
                <div class="times">
                    <label for="close_time">close</label><br>
                    <input id="close_time" class="time" type="time" name="close_time" v-model="prefs.close_time" required>
                </div>
            </div>
            </div>
        </flipcard>
    </div>
</template>

<script>
import axios from 'axios'
import flipcard from '@/components/FlipCard.vue'

export default {
  name: 'Preferences',
  components: {
      flipcard
  },
  data(){
       return {
           prefs:{},
           loaded:false
       }
    },
    methods:{
        saveData: function(){
            axios.post(`${process.env.VUE_APP_PREFS_URL}set/`, this.prefs)
        }
    },
    created: function () {
        axios.get(`${process.env.VUE_APP_PREFS_URL}`)
        .then(res => {
            this.prefs = Object.assign({}, this.prefs, res.data)
            this.loaded = true
        })
    },
    filters:{
        AMPM: function(time){
            let [hours, minutes] = time.split(":")
            hours = Number(hours)
            let ampm = hours < 12 ? "AM" : "PM"
            hours = ((hours + 11) % 12 + 1)
            return `${hours}:${minutes} ${ampm}`
        }
    }

}
</script>
<style scoped>
    .hidden{
        display: none;
    }
    #prefs{
        padding: 0 1em;   
    }
    .instruction{
        font-size: .85em;
    }
    h1{
        font-weight: 300;
        font-size: 2.5em;
    }
    flipcard{
        width: 25em;
        padding: 1em;
    }
    .pref-pane{
        width: 25em;
        padding: 1em ;
        border: 1px solid #ddd;
        border-radius: 15px;
        margin: .5em;
    }
    .controls {
        display: flex;
    }
    .times {
        margin-left: 1em;
    }
    .time {
        border:none;
        font-size: 1em;
        
    }
   .onoffswitch {
    position: relative; width: 90px;
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
    }
    .onoffswitch-checkbox {
        display: none;
    }
    .onoffswitch-label {
        display: block; overflow: hidden; cursor: pointer;
        border: 2px solid #999999; border-radius: 20px;
    }
    .onoffswitch-inner {
        display: block; width: 200%; margin-left: -100%;
        transition: margin 0.3s ease-in 0s;
    }
    .onoffswitch-inner:before, .onoffswitch-inner:after {
        display: block; float: left; width: 50%; height: 30px; padding: 0; line-height: 30px;
        font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
        box-sizing: border-box;
    }
    .onoffswitch-inner:before {
        content: "ON";
        padding-left: 10px;
        background-color: coral; color: #FFFFFF;
    }
    .onoffswitch-inner:after {
        content: "OFF";
        padding-right: 10px;
        background-color: #EEEEEE; color: #999999;
        text-align: right;
    }
    .onoffswitch-switch {
        display: block; width: 14px; margin: 8px;
        position: absolute; top: 0; bottom: 0;
        right: 56px;
        border: 2px solid #999999; border-radius: 20px;
        transition: all 0.3s ease-in 0s; 
    }
    .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
        margin-left: 0;
    }
    .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
        right: 0px; 
    }
    
</style>