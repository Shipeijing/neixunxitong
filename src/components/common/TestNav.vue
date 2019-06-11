/* 
说明：考试页导航
功能：
 */
<template>
    <div>
<div id="testNav">
       <ul class="testNav-ul-1">
           <li name="fanhui" @click="callback" @mouseenter="changecolor($event)" @mouseleave="changecolor1($event)"><img :src="fanhui" alt="">返 回</li>
           <li name="geren" @mouseenter="changecolor($event)" @mouseleave="changecolor1($event)"><router-link active-class="active1"  to="/User" exact><img :src="geren" alt="">个人中心</router-link></li>
           <li ref="mu" name="mulu" @click="changeindex1" @mouseenter="changecolor($event)"  @mouseleave="changecolor1($event)" style="color:#c7000a;"><img :src="mulu" alt="">目 录
          
            </li>
           <li name="dingbu" @click="scrollTo" @mouseenter="changecolor($event)" @mouseleave="changecolor1($event)"><img :src="dingbu" alt="">返回顶部</li>
        </ul>
        <div :class="donghua+' mulubox'">
          <div>
        <el-tree
  :data="data"
  :props="defaultProps"
  accordion
  @node-click="handleNodeClick">
</el-tree></div>
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
export default {
    data(){
        return{
          currentPage1: 1,
          donghua:null,
          dialogTableVisible: false,
          testNav3:3,
          fanhui:fanhui1,
          geren:geren1,
          mulu:mulu2,
          dingbu:dingbu1,
          Nav:1,
          muluList:[],
          twoMulu:[],
          threeMulu:[],
          data: [{label: '一级 1',children: [{label: '二级 1-1',children: [{label: '三级 1-1-1'}] }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }

        }
    },
    props:['testId'],
    computed: mapState(['testNav']),
    mounted(){
       if(sessionStorage.getItem("currentPage1")){
               this.currentPage1=parseInt(sessionStorage.getItem("currentPage1"))
            }
      var _this=this
        this.$axios.post("/CourseContentApi/getTree",qs.stringify({
         id:_this.testId
        })).then(function(response){
           _this.data=response.data.courseLogList
        })
    },
    methods:{
      handleNodeClick(data){
        var _this=this
        this.$axios.post("/CourseContentApi/getZtreeCouerLog",qs.stringify({
         id:data.id
        })).then(function(response){
            _this.$store.commit('changerows',response.data.course.rows)
           _this.$store.commit('changetotal',response.data.course.total)
          sessionStorage.setItem("currentPage1",_this.currentPage1);
        })
      },
      opentText(id,schnum){
          this.$store.commit('setschnum',schnum)
          this.$store.commit('openText',id,schnum)
          this.$store.commit('changeindex',this.testNav3,)
      },
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
        callback(){
            if(this.testNav!=1){
              this.$store.commit('changeindex',this.Nav)
            }else{
              this.$router.replace({ path: "/" });
            }
        },
        changeindex1(){
          this.$store.commit('changeindex',this.Nav)
        },
        scrollTo() {
     this.$nextTick(() => {
        this.$refs.ttexttestlist.scrollTop = 0
      })
    },
         changecolor(e){
          this.$refs.mu.style.color="#5d5d5d"
          this.mulu=mulu1
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
         this.donghua='xiaoguo'
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
         this.donghua=null
        break;
        case 'dingbu':this.dingbu=dingbu1
         this.index=4
        break;
        }
         this.$refs.mu.style.color="#c7000a"
          this.mulu=mulu2
        }
    }
}
</script>
<style>
.mulubox{
  width: 0px;
  padding: 0px;
  max-height: 400px;
  overflow-y: auto;
  position: absolute;
  top:120px;
  left: 62px;
  z-index: 2000;
  opacity: 0;
  transition:opacity 0.3s, padding 0.3s, width 0.3s;
  
}
.mulubox>div{
 box-shadow: 0px 0px 5px 0px #999999;
}
.mulubox:hover{
  opacity: 1;
  width: 250px;
   padding: 10px 24px;
}
.xiaoguo{
   opacity: 1;
   width: 250px;
    padding: 10px 24px;
transition:opacity 0.3s, padding 0.3s, width 0.3s;

}
/* .xiaoguo:hover{
opacity: 1;
} */
.el-tree-node__content{
  padding: 7px 20px;
  border-bottom: 1px solid #ffffff;
  background-color: #efeeea;
}
.el-tree-node__content:hover{
  color: #c7000a;
  background-color: #efeeea;
}
.el-tree-node:focus > .el-tree-node__content {
    background-color: #ffffff;
    color: #c7000a;
}
.muluListindex{
  width: 100%;
   color: black;
   display: inline-block;
   font-size: 13px;
   text-align: left;
   padding: 10px 0px; 
}
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
#testNav{
   float: left;
   position: relative;
}
.testNav-ul-1{
    list-style: none;
    margin-left: -40px;
    margin-top: 0px;
}
.testNav-ul-1>li{
   width: 60px;
   padding: 10px 5px;
  font-size: 12px;
  text-align: center;
  background-color: white;
  color: #5d5d5d;
  border-bottom: 1px solid #efeeea;
  cursor:pointer;
}
.el-submenu__title{
  font-size: 12px;
  text-align: center;
  color: #c7000a;
  height: 40px;
  line-height: 20px;
}
.el-submenu__title:hover{
  background-color: white;
}
.el-menu{
    border: 0px;
}
.testNav-ul-1>li>a{
  color: #5d5d5d;
  text-decoration: none;
  font-size: 12px;
}
#testNav ul li img{
width: 18px;
display: block;
margin: 5px auto;
cursor:pointer;
}
</style>