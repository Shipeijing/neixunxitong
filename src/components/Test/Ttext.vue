/* 
说明：查看内容页
功能：展示内容
 */
<template>
    <div class="TtestNav-list">
        <div id="TtestNav">
            <!-- 导航部分 -->
       <ul>
           <li name="fanhui" @click="callback" @mouseenter="changecolor($event)" @mouseleave="changecolor1($event)"><img :src="fanhui" alt="">返 回</li>
           <li name="geren" @mouseenter="changecolor($event)" @mouseleave="changecolor1($event)"><router-link active-class="active1"  to="/User" exact><img :src="geren" alt="">个人中心</router-link></li>
           <li ref="mu" name="mulu" @click="changeindex1" @mouseenter="changecolor($event)"  @mouseleave="changecolor1($event)"><img :src="mulu" alt="">目 录</li>
           <li name="dingbu" @click="scrollTo" @mouseenter="changecolor($event)" @mouseleave="changecolor1($event)"><img :src="dingbu" alt="">返回顶部</li>
        </ul> 
    </div>
    <div id="ttext" class="ttext">
       <div class="ttext-test-header">
            <div>
                <!-- 顶部 -->
             <h1>{{textTitle}}</h1>
             <span><img src="../../../static/test/book.png" alt="">卓越不动产</span>
             <span><img src="../../../static/test/text.png" alt="">32220字</span>
             <span><img src="../../../static/test/time.png" alt="">
             <countdown endTime="1590761620" :callback="callback" endText="考试结束"></countdown>
             </span>
            </div>
            <button @click="changeindex3(examId)">立即测试</button>
          </div> 
          <!-- 主要内容 --> 
          <div class="ttext-test-list" id="ttext-test-list" v-loading="loading" ref="ttexttestlist" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">
              <div v-html="list"></div>
              <div ref="staffgauge"></div>
          </div>
    </div>
    </div>
</template>
<script>
import fanhui2 from '../../../static/test/fanhui.png'
import geren2 from '../../../static/test/yonghu.png'
import mulu2 from '../../../static/test/mulu.png'
import dingbu2 from '../../../static/test/zhiding.png'

import fanhui1 from '../../../static/test/fanhui1.png'
import geren1 from '../../../static/test/yonghu1.png'
import mulu1 from '../../../static/test/mulu1.png'
import dingbu1 from '../../../static/test/zhiding1.png'
import { mapState } from 'vuex'
import qs from 'qs'
import countdown from './count-down.vue'
export default {
     data(){
        return{
            loading:true,
            list:"",
            textTitle:'',
            testNav3:2,
             fanhui:fanhui1,
          geren:geren1,
          mulu:mulu1,
          dingbu:dingbu1,
          Nav:1,
          examId:null,
        stt:null,
        }
     },
     beforeCreate(){
             this.loading=true
         },

         updated(){
            this.loading=false
         },
    components:{
         countdown
    },
      computed: mapState(['textId','testNav','baifenbi','schnum']),
      mounted(){
          document.getElementById('ttext').style.height=(window.innerHeight*0.78)+'px'
        document.getElementById('ttext-test-list').style.height=(window.innerHeight*0.64)+'px'
        var _this=this
        this.$axios.post("/CourseContentApi/getCouerLogContent",qs.stringify({
         id:_this.textId
        })).then(function(response){
            console.log(response)
          if (response.data.code === 200) {
            _this.list=response.data.content[0].content
            _this.textTitle=response.data.content[0].title
            _this.examId=response.data.content[0].examId
        //     _this.$nextTick(() => {
        //         let stm=_this.$refs.ttexttestlist.scrollTopMax
        //         let sc=_this.schnum
        //    _this.$refs.ttexttestlist.scrollTop=(sc*0.01*stm)
        //     })
          } else {
             console.log(response)
          }
        })
         _this.$nextTick(() => {
             setTimeout(function(){
          if(_this.testNav!=3){
           clearTimeout(_this.stt)
          }else{
           _this.stt= setTimeout(function(){
          if(_this.$refs.staffgauge.offsetTop<=604){
             _this.$store.commit('ssetInterval')
            }
            clearTimeout(_this.stt)
             },2000)
          }
             },2000)
        _this.$refs.ttexttestlist.addEventListener("scroll", function(){
             _this.jindujilu()
         }) 
         
          })
          document.getElementById("ttext-test-list").oncontextmenu = function(e){
　　return false;
}
         },
        methods:{
            jindujilu(){
                let zs=(this.$refs.staffgauge.offsetTop-780)
                let ss=parseInt(this.$refs.ttexttestlist.scrollTop)
                if(ss<=zs){
                  let zss=parseInt((ss/zs)*100)
                if(zss>95){
                  zss=100
                }
                if(this.baifenbi<zss){
                    this.$store.commit('baifenbi',zss)
                }
                }
                // if(this.$refs.ttexttestlist.scrollTopMax){
                //    var zs=this.$refs.ttexttestlist.scrollTopMax
                // }else{
                //     var zs=this.$refs.ttexttestlist.scrollHeight-this.$refs.ttexttestlist.offsetHeight
                // }
               },
            callback:function(){},
            changeindex3(id){
               this.$store.commit('clearI')
            this.$store.commit('jindu')
            this.$store.commit('changeindex',this.testNav3)
            this.$store.commit('openExam',id)
        },
         callback(){
             this.$store.commit('clearI')
             this.$store.commit('jindu')
            if(this.testNav!=1){
              this.$store.commit('changeindex',this.Nav)
            }else{
              this.$router.push({ path: "/User" });
            }
        },
        // 返回操作
        changeindex1(){
            this.$store.commit('clearI')
            this.$store.commit('jindu')
          this.$store.commit('changeindex',this.Nav)
        },
        // 返回顶部
        scrollTo() {
        this.$nextTick(() => {
        this.$refs.ttexttestlist.scrollTop = 0
      })
    },
        changecolor(e){
        e.target.style.color='#c7000a'
        switch(e.target.attributes.name.value){
        case 'fanhui':this.fanhui=fanhui2
         this.index=1
        break;
        case 'geren':this.geren=geren2
              e.target.lastChild.style.color='#c7000a'
         this.index=2
        break;
        case 'mulu':this.mulu=mulu2
         this.index=3
        break;
        case 'dingbu':this.dingbu=dingbu2
         this.index=4
        break;
        }
        },
        changecolor1(e){
        e.target.style.color='#5d5d5d'
        switch(e.target.attributes.name.value){
        case 'fanhui':this.fanhui=fanhui1
         this.index=1
        break;
        case 'geren':this.geren=geren1
         e.target.lastChild.style.color='#5d5d5d'
         this.index=2
        break;
        case 'mulu':this.mulu=mulu1
         this.index=3
        break;
        case 'dingbu':this.dingbu=dingbu1
         this.index=4
        break;
        }
        }
        }
}
</script>
<style>

.ttext{
   width:91%;
   float: right;
   cursor:default;
   background-color: white;
}
@media screen and (min-height: 740px) {
    .ttext{
     height: 630px;
    }
    .ttext-test-list{
     height: 520px;
    }
}

.ttext-test-header{
    width: 100%;
    height: 70px;
    background-color: white;
    /* box-shadow: 0px 1px 2px 0px #999999; */
}
.ttext-test-list{
    width: 90%;
   overflow-y: scroll;
   overflow-x: hidden;
    padding: 20px 5% 20px 5%;
   margin-top: -10px;
   background-image: url('../../../static/test/b_logo.jpg');
   background-size:200px auto;
}
.ttext-test-header>div{
    width: 70%;
    float: left;
    padding: 5px;
}
.ttext-test-header>div>h1{
    font-size: 15px;
    padding-left: 20px;
}
.ttext-test-header>div>span{
    padding: 0px 5px;
    margin-right:0%;
    color: #999999;
    font-size: 13px;
}
.ttext-test-header>div>span>img{
    padding: 0px 15px;
}
.ttext-test-header>button{
    width:100px;
    display: block;
    float: right;
    color: white;
    background-color: #c7000a;
    border: 0;
    border-radius: 30px;
    padding: 8px;
    text-align: center;
    margin: 17px 50px 0px 0px;
    cursor:pointer;
}

#TtestNav{
   float: left;
}
#TtestNav ul{
    list-style: none;
    margin-left: -40px;
    margin-top: 0px;
}
#TtestNav ul li{
   width: 60px;
   padding: 10px 5px;
  font-size: 12px;
  text-align: center;
  background-color: white;
  color: #5d5d5d;
  border-bottom: 1px solid #efeeea;
}
#TtestNav ul li a{
  color: #5d5d5d;
  text-decoration: none;
  font-size: 12px;
}
#TtestNav ul li img{
width: 18px;
display: block;
margin: 5px auto;
}
</style>