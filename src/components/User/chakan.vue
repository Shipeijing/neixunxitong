/* 
说明：查看个人绩点页
功能：展示个人绩点
 */
<template>
    <div id="chakan"  v-loading="loading">
       <div class="chakan-div-1"><span>查看绩点</span><span>当前积分：<span style="font-size: 20px;">{{sum}}</span></span></div> 
       <div class="chakan-div-2">
           <ul v-for="(item,index) in jifen" :key="index">
               <li>{{item.content}}</li>
               <li style="color: #999999; font-size: 14px;">{{item.date}}</li>
               <li>{{item.performance}}</li>
           </ul>
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:true,
            jifen:[],
            sum:null
        }
    },
             beforeCreate(){
             this.loading=true
         },

         updated(){
            this.loading=false
         },
    mounted(){
         var _this=this
         this.$axios.post("/CourseContentApi/getPerformance/").then(function(response){
          _this.jifen=response.data.performanceList
          _this.sum=response.data.sum
        }) 
    }
}
</script>
<style>
#chakan{
float: right;
width:  84%;
height: 100%;
background-color: white;
 cursor:default;
}
.chakan-div-1{
   width: 90%; 
   height: 18%;
   margin: 0 auto;
}
.chakan-div-1>span{
    display: block;
}
.chakan-div-1>span:first-child{
    width: 97%;
    padding-left:3%;
    border-left: 4px solid #c7000a;
    color: #c7000a;
    margin: 3% 0px;
}
.chakan-div-1>span:last-child{
    color: white;
     width: 94%;
    padding:2% 3%;
    font-weight: 600;
    border-radius: 5px;
    background-image: url('../../../static/geren/yuanjiaojvxing11.png');
    background-size: 100% 100%;
}
.chakan-div-2{
    width: 100%;
    height:77%;
    min-height: 440px;
    margin-top: 1%;
    overflow-y: scroll;
    background-color: white;
}
.chakan-div-2 ul{
    margin: 0px 5%;
    padding: 15px 0px;
    list-style: none;
    border-bottom: 1px dashed #efeeea;
    position: relative;
}
.chakan-div-2>ul>li:first-child{
    margin-bottom: 10px;
    font-size: 14px;
}
.chakan-div-2>ul>li:last-child{
    position: absolute;
    top: 40%;
    left: 95%;
    color: #ff803b;
    font-size: 18px;
    font-weight: 600;
}
</style>