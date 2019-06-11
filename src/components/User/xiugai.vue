/* 
说明：修改密码页
功能：修改密码功能
 */
<template>
    <div id="xiugai"  v-loading="loading">
       <div class="wode-div-1">
          <span>修改密码</span> 
       </div>
        <form>
        <span>原密码：</span><input type="password" v-model="oldpwd"><br/>
        <div class="teshu-1"><span>新密码：</span><input type="password" v-model="newpwd" @blur="jiance()" minlength="4" maxlength="18">
        <el-alert v-if="elalert==1" title="密码格式为4-18个字节的数字和字母！" type="info"  show-icon></el-alert>
        <el-alert v-else title="密码格式错误！" type="error" show-icon></el-alert></div>
        <span>确认密码：</span><input type="password" v-model="newpwd1"><br/>
        <div class="teshu-2">
        <span>验证码：</span><input type="text" style="width: 100px;" v-model="yanzhengma">
        <div @click="refreshCode"><SIdentify :identifyCode="identifyCode"></SIdentify></div>
        <el-alert
    title="验证码均为大写字母！"
    type="info"
    show-icon>
  </el-alert>
        </div>
        <br/>
       </form>
       <button @click="updatapwd">保存</button>
    </div>
</template>
<script>
import qs from 'qs'
import SIdentify from '../common/Identify'
export default {
    data() {
    return {
      loading:true,
      identifyCodes: "ZXCVBNMASDFGHJKLQWERTYUIOP",
      identifyCode: "",
      oldpwd:null,
      newpwd:null,
      newpwd1:null,
      yanzhengma:null,
      elalert:1,
    };
  },
           beforeCreate(){
             this.loading=true
         },

         updated(){
            this.loading=false
         },
         
    mounted() {/* 生成验证码 */
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    jiance(){
      // 检测输入格式是否正确
     let guize= /[0-9a-zA-Z]{4,18}/
     if(guize.test(this.newpwd)){
         this.elalert=1
     }else{
         this.elalert=0
     }
    },
    // 确认提交修改请求
    updatapwd(){
     if(this.yanzhengma==this.identifyCode){
       this.refreshCode()
       if(this.newpwd==this.newpwd1){
         if(this.newpwd.length<18||this.newpwd.length>6){
           var _this=this
        this.$axios.post("/LoginApi/updatePwd",qs.stringify({
         newpwd:_this.newpwd,oldpwd:_this.oldpwd
        })).then(function(response){
          if(response.data.code==200){
            _this.oldpwd=null
             _this.newpwd=null
              _this.newpwd1=null
               _this.yanzhengma=null
           _this.$message({
            duration:2000,
          message: '修改成功！',
          type: 'success'
        });
        let user=JSON.parse(sessionStorage.getItem("User"))
        let Base64 = require("js-base64").Base64
        localStorage.setItem(user.username,Base64.encode(_this.newpwd))
         
          }else{
             _this.$message.error(response.data.mag);
          }
        })
         }else{
          alert("密码长度为6-18字节，请重新输入！")
         }
         
     }else{
         alert("两次密码不一致，请重新输入！")
     }
     }else {
         alert("验证码不正确，请重新输入！")
     }
    },
    // 生成验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    }
  },
    components:{
        SIdentify
    }
}
</script>
<style>
.teshu-2{
  display: flex;
  flex-wrap: nowrap;
}
/* 验证码 */
.teshu-2>.el-alert{
width: 198px;
height: 20px;
background-color: white;
margin-top: 8px;
padding-top: 18px;
}
.teshu-1{
     display: flex;
  flex-wrap: nowrap;
}
.teshu-1>span{
  width: 100px;
  padding: 15px 0px;
}
.teshu-1>.el-alert{
  background-color: white;
  width: 290px;
  margin-right: 0%;
  padding-top: 8px;
  margin-top: 10px;
  cursor:default;
}
#xiugai{
float: right;
width: 84%;
height: 100%;
background-color: white;
}
#xiugai>form{
    margin-left: 5%;
    position: relative;
}
#xiugai>form>span{
    width: 100px;
    display: inline-block;
}
.teshu-2>span{
  width: 100px;
   padding-top: 15px;
}
#xiugai>form input{
    width: 300px;
    margin: 10px 0px;
    border: 1px solid #d2d2d2;
    padding: 8px;
}
#xiugai>form input:focus{outline:none;}
#xiugai>button{
    width: 415px;
    border: 0px;
    border-radius:5px;
    padding: 7px 25px;
    color: white;
    background-color: #c7000a;
    margin: 20px 5%; 
}
</style>