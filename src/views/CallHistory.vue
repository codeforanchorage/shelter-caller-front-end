<template>
 <div id="container">
    <h2>{{sheltername}}</h2>
    <div id="table_control">
    <table>
        <caption>Contact History | page {{page}} of {{ lastpage }}
        <button class="next" v-if="page < lastpage" @click="nextpage">next</button><button class="prev" v-if="page > 1"  @click="prevpage">prev</button>  

        </caption>
        <tr class="header_row">
            <th>contact number</th>
            <th>count</th>
            <th>raw input</th>
            <th>type</th>
            <th>time</th>
            <th>action</th>
            <th>error</th>
        <tr>
        <tr v-for="row in history" v-bind:key="row.time">
            <td>{{row.from_number | formatPhone}}</td>
            <td>{{row.parsed_text}}</td>
            <td>{{row.input_text}}</td>
            <td>{{row.contact_type}}</td>
            <td>{{row.time | formatDate}}</td>
             <td>{{row.action}}</td>
            <td>{{row.error}}</td>
        </tr>
    </table>
    
    </div>
 </div>
    
</template>
<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                page:1,
                history:[],
                sheltername: "",
                totalcalls:0,
                pagesize:0
            }
        },
        computed:{
            lastpage(){
                return this.pagesize
                ? Math.ceil(this.totalcalls / this.pagesize)
                : ""
                
            }
        },
        
        filters:{
            formatDate(val){
                return new Date(val).toLocaleString()
            },
            formatPhone(val){
                return /^\+\d+$/.test(val) 
                ? `(${val.slice(2,5)}) ${val.slice(5, 8)}-${val.slice(8)}`
                : val
               
            }
        },
        methods:{
            prevpage(){
                this.page--
                this.getHistory()
            },
            nextpage(){
                this.page++
                this.getHistory()
            },
            getHistory(){
                return axios.get(`${process.env.VUE_APP_API_URL}logs/${this.$route.params.shelterid}/${this.page - 1}/`)
                .then(res => {
                    this.sheltername = res.data.shelter
                    this.history = res.data.logs
                    this.totalcalls = res.data.total_calls
                    this.pagesize = res.data.page_size
                })
            }
        },
        mounted(){
            this.getHistory()
        }
    }
</script>
<style scoped>
    #container{
        padding: 1em;
    }
    #table_control{
        position: relative;
        display: inline-block
    }
    h2 {
        font-weight: 300;
        font-size: 2.5em;
    }
    caption{
        text-align:left;
         padding: .5em;
         font-size: 1.5em;
         font-weight: 200;
    }
    th {
        text-align: left;
        font-size: .75em;
        text-transform: uppercase;
        padding: .5em;
        border-bottom: 1px solid #eee;
    }
  
    tr:nth-child(odd) {background: #eee}
    tr:nth-child(even) {background: #FFF}
    td{
        font-size: .875em;
        font-weight: 400;
        padding: .75em 1.75em .75em .75em;
    }
    table{
        border-bottom:1px solid #eee;
        min-width: 800px;

    }
    button{
        border:1px solid #ddd;
        font-size: .75em;
        font-weight: 200;
        padding: .25em .5em;
        border-radius: .5em;   
        float: right;
        outline: none;
        color:dimgray;
        background-color: white;

    }
  
    button:hover{
        background-color: #ddd;
        color:white;
        cursor: pointer;
    }
    
</style>
