/* 
说明：个人资料页
功能：个人资料展示
 */
<template>
    <div id="wode">
       <div class="wode-div-1">
          <span>个人资料</span> 
       </div>
       <form>
           <span>电话：</span><div class="form-div">{{user.tel}}</div><br/>
            <!-- <span>昵称：</span><input type="text" v-model="user.borderCode"><br/> -->
           <!-- <span style="height: 100px;margin:10px 0px;">头像：</span><div class="img-span"><img src="../../../static/geren/1.jpg" alt=""><button>编辑头像</button></div><br/> -->
           <span> 真实姓名：</span><div class="form-div">{{user.name}}</div><br/>
           <span> 性别：</span><label><input type="radio" style="margin-right: 20px;" :checked="checkednan" disabled>男
           <input type="radio" style="margin:0px 20px 0px 40px;" :checked="checkednv" disabled>女</label><br/>
           <span> 地区：</span><div class="form-div">{{user.addRess}}</div><br/>
           <span> 详细地址：</span><div class="form-div">{{user.addRess}}</div><br/>
            <span>个性签名：</span><div class="form-div">{{user.personalInfo}}</div><br/>

       </form>
       <!-- <button>保存</button> -->
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
import { mapState } from 'vuex'
export default {
    data(){
     return{
      checkednan:false,
      checkednv:false
     }
    },
    // 读取个人资料
    created:function(){
           this.user=JSON.parse(sessionStorage.getItem("User"))
           if(this.user.sex=='男'){
              this.checkednan=true
           }else{
               this.checkednv=true
           }
        //    this.select.province
            
    },
    components:{
        VDistpicker
    }
}
</script>
<style>
#wode{
float: right;
width: 84%;
height: 100%;
background-color: white;
cursor:default;
}
.wode-div-1{
   width: 96%; 
   padding-left: 4%;
}
.wode-div-1>span{
    display: block;
    width: 97%;
    padding-left:3%;
    border-left: 4px solid #c7000a;
    color: #c7000a;
    margin: 3% 0px;
}
#wode>form{
    margin-left: 5%;
    position: relative;
}
#wode>form>span{
    width: 100px;
    display: inline-block;
    font-size: 14px;

}
#wode>form .form-div{
    width: 300px;
    margin: 10px 0px;
    border: 1px solid #d2d2d2;
    padding: 8px 15px;
    display: inline-block;
    font-size: 14px;
    color: #5d5d5d;
}
.img-span{
    position: absolute;
    top: 65px;
    left: 100px;
}
#wode>form>div>img{
    width: 100px;
    height: 100px;
}
#wode>form>div>button{
    background-color: white;
    color: #c7000a;
    border: 0px;
    margin-left: 20px;
}
#wode>form>label{
    margin: 10px 0px;
    display: inline-block;
    font-size: 14px;
    color: #5d5d5d;
}
.distpicker{
    display: inline-block;
    margin: 10px 0px;
    font-size: 14px;
    color: #5d5d5d;
}
#wode>button{
    border: 0px;
    border-radius:20px;
    padding: 7px 25px;
    color: white;
    background-color: #c7000a;
    margin: 10px 5%; 
}
</style>
