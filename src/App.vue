<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>
<script>
export default{
  data(){
    return{
     wh:true
    }
  },
  mounted(){
     var _this=this
         this.$axios.post("/CourseContentApi/getBrokerLevNum/").then(function(response){
          _this.$store.commit('changebrokerNum',response.data.brokerNum)
        })
        
       window.onresize =()  =>{ 
          if(window.innerWidth<1050&&_this.wh==true){
            _this.openal()
            console.log(_this.wh)
          }else if(window.innerWidth>1050){
            _this.wh=true
          }

         }
       
  },
  methods:{
      openal(){
        this.wh=false
         this.$message({
          message: '本站适配宽:980px 高:400px以上窗口，请将浏览器扩大至最低配置以上！',
          type: 'warning',
          duration:6000,
        });
      }
  }
}
</script>
<style>
/* @import './assets/css/main.css'; */
body{
  margin: 0;
  height: 100%;
  width: 100%;
  background-color:#efeeea;
  min-width:1050px;
  overflow-y: hidden;
  overflow-x: hidden;
  padding:0;
}
button{
outline:none;
}
#app{
  width: 100%;
}
#app>div{
  width: 100%;
  height: 100%;
}
.nav-test{
 width: 100%;
  height: 78%;
  min-height: 520px;
}
.nav-test>div{
 height: 100%;
  margin: 1% auto;
}
@media screen and (min-width: 1332px) {
  .nav-test>div{
    width: 70%;
}
.header-1>div{
  width: 70%;
}
.header-2>div{
  width: 70%;
}
}
@media screen and (min-width: 1200px) and (max-width: 1332px) {
   .nav-test>div{
    width: 80%;
}
.header-1>div{
  width: 80%;
}
.header-2>div{
  width: 80%;
}
}
@media screen and (max-width: 1200px) {
   .nav-test>div{
    width: 90%;
}
.header-1>div{
  width: 90%;
}
.header-2>div{
  width: 90%;
}
}
</style>
