/* 
说明：全部历史试卷页
功能：展示全部历史试卷
 */
<template>
    <div id="quanbu"  v-loading="loading">
          <div class="quanbu-div-1">
          <span>历史试卷</span> 
       </div>
       <div class="quanbu-div-2"><button @click="calllishi()">返 回</button></div>
            <div id="quanbu-shijuan-ul" class="quanbu-shijuan-ul">
            <ul v-for="(item,index) in shijuan" @click="openTest(item.id)" :key="index">
                <li>编号 : {{item.id}}</li>
                <li>{{item.titile}}</li>
                <li style="color:#999999;font-size: 12px; margin-top: 10px; ">{{item.createDate}}</li>
            </ul>
            </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:true,
             shijuan:[]
        }
    },
             beforeCreate(){
             this.loading=true
         },

         updated(){
            this.loading=false
         },
    mounted(){
        document.getElementById('quanbu-shijuan-ul').style.height=(window.innerHeight*0.68)+'px'
         var _this=this
         this.$axios.post("/CourseContentApi/getIndexContentAll/").then(function(response){
          _this.shijuan=response.data.listExa.performanceList
        }) 
    },
    methods:{
      openTest(id){
         this.$store.commit('openOldExam',id)
         this.$emit("oldtest")

      },
      calllishi(){
             this.$emit("lishi") 
      }
    }
}
</script>
<style>
.quanbu-div-1{
   width: 50%;
   margin-left: 5%;
   float: left;
   padding: 30px 0px;
}
.quanbu-div-2>button{
    width: 10%;
    float:right;
text-align: center;
color: white;
font-size: 14px;
padding:6px 0px;
background-color: #c7000a;
border-radius: 20px;
margin: 25px 50px 0px 0px;
border: 0px;
 cursor:pointer;
}

.quanbu-div-1>span{
    display: block;
    padding-left: 20px;
    border-left: 4px solid #c7000a;
    color: #c7000a;
}
#quanbu{
   float: right;
   width: 84%;
   height: 100%;
   background-color: white;
   cursor:default;
}
.quanbu-shijuan-ul{
     width:95%;
    height:80%;
    margin-left: 5%;
    overflow-y: scroll;
     background-color: white;
}
.quanbu-shijuan-ul>ul{
    width: 80px;
    height: 120px;
    list-style: none;
    background-color: #efeeea;
    border-radius: 5px;
    float: left;
    margin: 0px 20px 40px 20px;
    padding-top: 0px;
     cursor:pointer;
}
.quanbu-shijuan-ul>ul>li{
    text-align: center;
    margin-left: -40px;
    font-size: 14px;
}
.quanbu-shijuan-ul>ul>li:first-child{
    margin: 15px 0px;
    margin-left: -80px;
    font-size: 12px;
    /* color: ; */
}
.quanbu-shijuan-ul>ul>li:last-child{
    padding-top: 8px;
}
</style>
