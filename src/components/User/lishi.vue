/* 
说明：历史试卷页
功能：展示个人总绩点数，试卷数，十张最新历史试卷
 */
<template>
    <div id="lishi" v-loading="loading">
        <div class="lishi-user">
            <img src="../../../static/touxiang.png" alt="">
            <div class="lishi-user-1"><h4 style=" font-weight:500;">欢迎登录 {{user.name}}</h4>
            <h6 style=" font-weight:500;color:#999999;">{{user.personalInfo}}</h6></div>
            <div class="lishi-user-2">历史试卷<br/><br/><span style="color:#c7000a;font-size:30px;">{{count}}</span><span style="color:#c7000a;font-size:12px;">个</span></div>
            <div class="lishi-user-3">我的绩点<br/><br/><span style="color:#ff803b;font-size:30px;">{{performance}}</span><span style="color:#ff803b;font-size:12px;">个</span></div>
        </div>
        <div id="lishi-shijuan" class="lishi-shijuan">
            <div  class="lishi-shijuan-span"><span>历史试卷</span><button @click="quanbu()">查看全部历史试卷></button></div>
            <div class="lishi-shijuan-ul">
            <ul v-for="(item,index) in shijuan" @click="openTest(item.id)" :key="index">
                <li>编号 : {{item.id}}</li>
                <li>{{item.titile}}</li>
                <li style="color:#999999;font-size: 12px; margin-top: 10px; ">{{item.createDate}}</li>
            </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:true,
           user:[],
           shijuan:[],
           performance:0,
           count:0,
        }
    },
             beforeCreate(){
             this.loading=true
         },

         updated(){
            this.loading=false
         },
     mounted(){
         document.getElementById('lishi-shijuan').style.height=(window.innerHeight*0.50)+'px'
         this.user=JSON.parse(sessionStorage.getItem("User"))
         var _this=this
         this.$axios.post("/CourseContentApi/getIndexContent/").then(function(response){
          _this.performance=response.data.perList[0].performance
          _this.count=response.data.listExa.count
          _this.shijuan=response.data.listExa.performanceList
        }) 
     },
     methods:{
         quanbu(){
             this.$emit("lishiquanbu")
         },
        openTest(id){
         this.$store.commit('openOldExam',id)
         this.$emit("oldtest7")
      },
     }
}
</script>
<style>
#lishi{
float: right;
width: 84%;
cursor:default;
}

.lishi-shijuan{
   width: 100%;
   height:350px;
   background-color: white;
   margin-top: 10px;
}
.lishi-shijuan-span span:first-child{
float:left;
width: 80px;
text-align:center;
padding-top: 2px;
padding-bottom: 5px;
border-bottom: 3px solid #ff803b;
}
.lishi-shijuan-span button{
width: 20%;
float:right;
text-align: right;
color: #999999;
font-size: 13px;
padding-top: 5px;
border: 0px;
background-color: white;
 cursor:pointer;
}
.lishi-shijuan-span{
    width:94%;
    height:30px;
    padding-top: 15px;
    margin: 0px 3%;
    border-bottom: 1px solid #efeeea;
}
.lishi-shijuan-span span{
    display:block;
}
.lishi-shijuan-ul{
    margin-left: 4.5%;
}
.lishi-shijuan-ul>ul{
    width: 80px;
    height: 120px;
    list-style: none;
    background-color: #efeeea;
    border-radius: 5px;
    float: left;
    margin: 40px 20px 0px 20px;
    padding-top: 0px;
     cursor:pointer;
}
.lishi-shijuan-ul>ul>li{
    text-align: center;
    margin-left: -40px;
    font-size: 14px;
}
.lishi-shijuan-ul>ul>li:first-child{
    margin: 15px 0px;
    margin-left: -80px;
    font-size: 12px;
    /* color: ; */
}
.lishi-shijuan-ul>ul>li:last-child{
    padding-top: 8px;
}
.lishi-user{
    width: 100%;
    background-color: white;
    display: flex;
    flex-wrap: nowrap;
}
.lishi-user>img{
    width: 100px;
    height: 100px;
    border-radius:50%;
    padding: 30px;
    margin-left: 20px; 
}
.lishi-user-1{
    width:30%;
    margin: 30px 0px;
    border-right: 1px solid #efeeea;
}
.lishi-user-2{
    width: 30%;
    padding: 20px 0px;
    text-align: center;
    border-right: 1px solid #efeeea;
    margin: 30px 0px;
    font-size: 13px;
}
.lishi-user-3{
     width: 30%;
    padding: 20px 0px;
    text-align: center;
    margin: 30px 0px;
    font-size: 13px;
}
</style>