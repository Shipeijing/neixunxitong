/* 
说明：登录页
功能：用户登录
 */
<template>
    <div class="login">
        <img class="login-img" src="../../static/logo-index.png" alt="">
        <img class="login-bg" src="../../static/login/bg.png" alt="">
        <div class="login-div">
            <img src="../../static/login/duobianxing2.png" alt="">
            <form class="login-form">
               <h2><span>欢迎登录</span><span>卓阅不动产</span></h2>
                <div class="form-div1">
                    <img :src="loginimg1" alt="">
                    <input type="text"  @mouseover="changeimg1" @mouseout="changeimg2" @change="jiance(user.userId)" v-model="user.userId" minlength="4" maxlength="18" placeholder="请输入你的用户名">
                </div>
                <div class="form-div1" >
                    <img :src="loginimg2" alt="">
                    <input type="password"  @mouseover="changeimg3" @mouseout="changeimg4" @change="jiance(user.userPwd)" autocomplete="new-password" v-model="user.userPwd" @blur="jiance()" minlength="4" maxlength="18" placeholder="请输入你的密码">
                </div>
                <div class="form-div2" @click="changesel"><div><img :src="select" alt=""></div>记住密码</div>
                <button @click="loginIn">立即登录</button>
            </form>
             <img src="../../static/login/duobianxing1.png" alt="">
        </div>
        <h1>© 2017-2019 shengle.wang, all rights reserved 卓阅不动产 沪ICP备18245212号-1</h1>
    </div>
</template>
<script>
import img1 from '../../static/login/iphone_normal.png'
import img2 from '../../static/login/iphone_highlight.png'
import img3 from '../../static/login/password_normal.png'
import img4 from '../../static/login/password_highlight.png'
import select from '../../static/login/select.png'
import qs from 'qs'
import { mapState } from 'vuex'
import md5 from 'js-md5'
export default {
    	computed: mapState(['testName']),
   data(){
       return {
          loginimg1:img1,
          loginimg2:img3,
          select:select,
          user:{userId:null,userPwd:null},
       }
   },
   methods:{
        jiance(e){
      // 检测输入格式是否正确
     let guize= /[0-9a-zA-Z]{4,18}/
     if(guize.test(e)){
     }else{
      this.$message({
          message: '请输入4-18个字节为数字或字母的账号和密码！',
          type: 'warning',
          duration:4000,
        });
     }
    },
       loginIn:function(){
           alert("loginId")
           console.log("loginId.......")
       var _this=this
        this.$axios.post("/LoginApi/login",qs.stringify({
        username:_this.user.userId,password:_this.user.userPwd
        })).then(function(response){
          if (response.data.code === 200) {
            _this.$message({
                duration:2000,
          message: '登录成功！正在进入...',
          type: 'success'
        });
           if(_this.select!=0){
            let Base64 = require("js-base64").Base64
             localStorage.setItem(_this.user.userId,Base64.encode(_this.user.userPwd))
           }else{
             localStorage.removeItem(_this.user.userId)
           }
            sessionStorage.setItem("token",JSON.stringify(response.data.token));
            sessionStorage.setItem("User",JSON.stringify(response.data.broker));
            _this.$store.commit('changebrokerNum',response.data.broker.brokerNum)
            _this.$router.push({name: 'Index'});
          } else {
             _this.$message.error('登录失败！请重新登录！');
          }
        })
       },
       changeimg1(){
         this.loginimg1=img2
       },
        changeimg2(){
         this.loginimg1=img1
         if(localStorage.getItem(this.user.userId)){
            let Base64 = require("js-base64").Base64
            this.user.userPwd=Base64.decode(localStorage.getItem(this.user.userId))
         }
       },
       changeimg3(){
         this.loginimg2=img4
         if(localStorage.getItem(this.user.userId)){
            let Base64 = require("js-base64").Base64
            this.user.userPwd=Base64.decode(localStorage.getItem(this.user.userId))
         }
       },
        changeimg4(){
         this.loginimg2=img3
       },
       changesel(){
           if(this.select!=0){
               this.select=0
           }else{
               this.select=select
           }
       }
   }
}
</script>
<style>
.login{
    width: 100%;
}
.login-div{
    width: 500px;
    display: flex;
    flex-wrap: nowrap;
    margin: 5% auto;
}
.login-div>img{
    width: 40px;
    height: 120px;
    margin-top:45%;
}
.login-div>img:first-child{
    margin-right: -3px;
}
.login-div>img:last-child{
     margin-left: -3px;
}
.login-bg{
    width: 100%;
    height: 65%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
}
.login-img{
    width: 10%;
    margin: 0px auto;
    margin-top:6%;
    display: block;
}
.login-form{
    width:90%;
    height: 300px;
    background-color: white;
    padding-top: 30px;
    padding-bottom: 10px;
}
.login-form>h2{
    width: 100%;
    font-size: 15px;
    color: #999999;
    font-family:'微软雅黑';
    text-align: center;
    font-weight:500;
    display: flex;
    justify-content:center;
}
.login-form>h2>span:first-child{
     color: #c7000a;
     font-size: 20px;
     display: inline-block;
     margin-top: -3px;
     margin-right: 7px;
}

.login-form>button{
    width: 70%;
    background-color: #c7000a;
    color: white;
    display: block;
    margin: 30px auto;
    border: 0px;
    border-radius: 5px;
    padding: 7px;
}
.form-div2{
    margin-left: 15%;
    display: flex;
    flex-wrap: nowrap;
    font-size: 14px;
}
.form-div2>div{
    width: 13px;
    height: 13px;
    border: 1px solid #999999;
    margin: 3px 10px 0px 0px;
     border-radius: 2px;
}
.form-div2>div>img{
    display: block;
   margin-top: 2.5px;
}
.form-div1{
    width: 70%;
    margin: 15px auto;
    /* border: 1px solid #999999; */
}
.form-div1>img{
    width: 12px;
    height: 15px;
    display: block;
    position: relative;
    top: 23px;
    left: 15px;
}
.form-div1>input{
    width: 83%;
    /* display: block; */
    border: 1px solid #999999;
    padding: 7px 2% 7px 15%;
}
.form-div1>input:hover{
    border-color: #c7000a;
}
.form-div1>input:focus{outline:none;}
.login>h1{
    font-size: 10px;
    text-align: center;
    color: #999999;
}

</style>
