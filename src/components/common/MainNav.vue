/* 
说明：顶部大类导航
功能：导航八大类别
 */
<template>
    <div id="header">
      <div  class="header-1">
        <div>
        <div>
        <router-link active-class="active1"  to="/" exact><span>首页</span></router-link>
        <router-link active-class="active1"  to="/User" exact><span>个人中心</span></router-link>
        <button @click="loginOut">注销</button>
        </div>
         <div>
        <h1>欢 迎 <span> {{user.name}} </span> 进 入 内 训 系 统 ！</h1></div></div>
        </div>
        <div  class="header-2">
          <div>
      <img src="../../../static/logo-index.png" alt="">
        <ul>
            <li @click="changeindex1" ><router-link  to="/qiye" exact><span>企业文化</span></router-link></li>
            <li @click="changeindex1" ><span v-if="brokerNum<2" @click="alerttishi()">经纪概论</span><router-link v-else to="/jingji" exact><span>经纪概论</span></router-link></li>
            <li @click="changeindex1" ><span v-if="brokerNum<3" @click="alerttishi()">商圈精耕</span><router-link v-else to="/shangquan" exact><span>商圈精耕</span></router-link></li>
            <li @click="changeindex1" ><span v-if="brokerNum<4" @click="alerttishi()">交易务实</span><router-link v-else to="/jiaoyi" exact><span>交易务实</span></router-link></li>
            <li @click="changeindex1" ><span v-if="brokerNum<5" @click="alerttishi()">实战宝典</span><router-link v-else to="/shizhan" exact><span>实战宝典</span></router-link></li>
            <li @click="changeindex1" ><span v-if="brokerNum<6" @click="alerttishi()">银行贷款</span><router-link v-else to="/yinhang" exact><span>银行贷款</span></router-link></li>
            <li @click="changeindex1" ><span v-if="brokerNum<7" @click="alerttishi()">法律制度</span><router-link v-else to="/falv" exact><span>法律制度</span></router-link></li>
            <li @click="changeindex1" ><span v-if="brokerNum<8" @click="alerttishi()">相关知识</span><router-link v-else to="/xiangguan" exact><span>相关知识</span></router-link></li>
            <li @click="changeindex1" ><span v-if="brokerNum<9" @click="alerttishi()">公共学科</span><router-link v-else to="/gonggong" exact><span>公共学科</span></router-link></li>
        </ul>
        </div>
         </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['brokerNum']),
  data() {
    return {
    testNav:1,
    user:[],
    };
  },
  mounted(){
    this.user=JSON.parse(sessionStorage.getItem("User"))
  },
   methods:{
     alerttishi(){
       this.$message({
          message: '该章节尚未解锁！',
           duration:1000,
           showClose:true,
          type: 'warning'
        });
     },
       changeindex1(){
          this.$store.commit('changeindex',this.testNav)
          sessionStorage.setItem("currentPage1",1);
        }, 
        loginOut(){
          sessionStorage.clear()
          this.$store.commit('loginOut')
          this.$router.replace({ path: "/Login" });
        }
   }
};
</script>
<style>
#header{
  width: 100%;
  height: 13%;
  min-height: 100px;
  background-color: white;
  z-index: 100;
}
.header-2{
  width:100%;
  height: 60px;
  padding-top: 5px;
}
.header-2>div{
  margin: 0 auto;
}
.header-2 ul{
  width: 810px;
  list-style: none;
  float: left;
}
.header-2 ul li{
  float: left;
  cursor:default;
}
.header-2 ul li>span{
   display: inline-block;
  font-size: 14px;
  padding: 5px 15px;
  color: #999999;
}
.active{
  background: #c7000a;
} 
.active>span{
  color: white;
}
.active1>span{
  /* color:#c7000a; */
}
.header-2 ul>li>a{
  color: black;
  text-decoration: none;
  padding: 5px 15px;
  display: inline-block;
  font-size: 14px;
  border-radius: 20px;
}
.header-1{
  width:100%;
  height: 30px;
  background-color: #aaa;
}
.header-1>div{
  margin: 0 auto;
}.header-1>div>div:last-child{
  float: left;
}
.header-1>div>div:first-child{
  float: right;
  padding-top: 5px;
}
#header img{
  width: 80px;
  height: auto;
  float: left;
  margin-top: 10px;
}
.header-1 div>a{
  color:#ffffff;
  text-decoration: none;
  font-size: 12px;
  margin: 0px 10px;
}
.header-1 div>a:hover{
  color: #c7000a;
}
.header-1 h1{
  font-size:13px;
  font-weight: 500;
  margin-top: 7px;
  cursor:default;
  color: #ffffff;
}
.header-1 h1 span{
  color: #c7000a;
}
.header-1 button{
  color: #ffffff;
  text-decoration: none;
  font-size: 12px;
  border: 0px;
  background-color: #aaa;
  cursor:pointer;
}
.header-1 button:hover{
  color: #c7000a;
}
</style>
