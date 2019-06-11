/* 
说明：考试页
功能：考试功能
 */
<template>
  <div id="exam">
    <div class="exam-nav">
      <div>
        <span class="exam-nav-span1">单选题：</span>
        <span
          class="exam-nav-span2"
          :ref="'questionDx'+index"
          v-for="(item,index) in questionDx"
          :key="index"
        >
          <a href="" @click.prevent="custormAnchor('Dx'+index)">{{index+1}}</a>
        </span>
      </div>
      <div style="border-top:1px dashed #999999;">
        <span class="exam-nav-span1">多选题：</span>
        <span
          class="exam-nav-span2"
          v-for="(item,index) in questionDdx"
           :ref="'questionDdx'+index"
          :key="index"
        ><a href="" @click.prevent="custormAnchor('Ddx'+index)">{{index+1}}</a>
        </span>
      </div>
      <div style="border-top:1px dashed #999999;">
        <span class="exam-nav-span1">判断题：</span>
        <span
          class="exam-nav-span2"
          :ref="'questionPd'+index"
          v-for="(item,index) in questionPd"
          :key="index"
        >
          <a href="" @click.prevent="custormAnchor('Pd'+index)">{{index+1}}</a>
        </span>
      </div>
      <button @click="submitExam">确认交卷</button>
     <ul>
           <li name="fanhui" @click="back" @mouseenter="changecolor($event)" @mouseleave="changecolor1($event)"><img :src="fanhui" alt="">返 回</li>
           <li name="geren" @click="backUser"  @mouseenter="changecolor($event)" @mouseleave="changecolor1($event)"><img :src="geren" alt="">个人中心</li>
           <li ref="mu" name="mulu" @click="back" @mouseenter="changecolor($event)"  @mouseleave="changecolor1($event)"><img :src="mulu" alt="">目 录</li>
           <li name="dingbu" @click="scrollTo" @mouseenter="changecolor($event)" @mouseleave="changecolor1($event)"><img :src="dingbu" alt="">返回顶部</li>
        </ul> 
    </div>
     <div class="exam-test">
      <div class="exam-test-header">
        <div>
          <h1>考试类别 ：{{testType}}</h1>
          <h6>答题记录 ：</h6>
          <h6>已答 ：{{yizuolist}}</h6>
           <h6>未答 ：{{testlist-yizuolist}}</h6>
        </div>
        <countdown
          class="exam-test-header-span"
          endTime="6000000"
          :callback="callback"
          :timeType="1"
          @timeo="timeout"
          endText="考试结束"
        ></countdown>
        <span class="exam-test-header-span">剩余时间 ：</span>
      </div>
      <div id="examtestlist" v-loading="loading" ref="examtestlist" class="exam-test-list">
        <!-- 单选题 -->
        <div>
          <h4>单选题</h4>
          <ul v-for="(item,index) in questionDx" :key="index">
           <img
              class="exam-test-list-img" :ref="'DxImg'+index"
              @click="changec($event,'questionDx',index)"
              :src="biaoji"
              alt
            >
            <li class="exam-test-list-title" name='0' :ref="'Dx'+index" :id="'Dx'+index"><span>第 {{index+1}} 题： </span><span class="exam-test-list-title-span">{{item.name}}</span></li>
            <li
              class="exam-test-list-option"
              v-for="(optionitem,optionindex) in optionArrayDx(index)"
              :key="optionindex"
            >
              <input
                type="radio"
                :name="'Dx'+index"
                @change="changebg('questionDx',index)"
                @click="setoptionindex(item.id,'Dx'+index,optionindex)"
                :value="optionindex"
                v-model="item.brokerAnswer"
                style="margin-right: 10px;"
              ><span>{{optionitem}}</span>
            </li>
          </ul>
        </div>
        <!-- 多选题 -->
          <div>
            <h4>多选题</h4>
          <ul v-for="(item,index) in questionDdx" :key="index">
            <img
              class="exam-test-list-img" :ref="'DdxImg'+index"
              @click="changec($event,'questionDdx',index)"
              :src="biaoji"
              alt
            >
            <li class="exam-test-list-title" name='0' :ref="'Ddx'+index" :id="'Ddx'+index"><span>第 {{index+1}} 题： </span><span class="exam-test-list-title-span">{{item.name}}</span></li>
            <li
              class="exam-test-list-option"
              v-for="(optionitem,optionindex) in optionArrayDdx(index)"
              :key="optionindex"
           >    
              <input
                type="checkbox"
                :name="'Ddx'+index"
                :ref="'DdxT'+index"
                @change="changebg('questionDdx',index)"
                @click="setoptionindexDdx(item.id,'DdxT'+index,index)"
                style="margin-right: 10px;"
                :value="optionindex"
              >
              <span>{{optionitem}}</span>
            </li>
          </ul>
        </div>
        <!-- 判断题 -->
       <div>
         <h4>判断题</h4>
          <ul v-for="(item,index) in questionPd" :key="index">
            <img
              class="exam-test-list-img" :ref="'PdImg'+index"
              @click="changec($event,'questionPd',index)"
              :src="biaoji"
              alt
            >
            <li class="exam-test-list-title" name='0' :ref="'Pd'+index" :id="'Pd'+index"><span>第 {{index+1}} 题： </span><span class="exam-test-list-title-span">{{item.name}}</span></li>
            <li
              class="exam-test-list-option"
              v-for="(optionitem,optionindex) in optionArrayPd(index)"
              :key="optionindex"
           >       
              <input
                type="radio"
                :name="'Pd'+index"
                @change="changebg('questionPd',index)"
                @click="setoptionindex(item.id,'Pd'+index,optionindex)"
                style="margin-right: 10px;"
                :value="optionindex"
                v-model="item.brokerAnswer"
              >
              <span>{{optionitem}}</span>
            </li>
          </ul>
        </div>
        <span class="list-span-h"></span>
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

import xingxing from "../../../static/test/xingxing.png";
import xingxing1 from "../../../static/test/xingxing1.png";

import countdown from "./count-down.vue";
import { mapState } from "vuex";
import qs from "qs";
export default {
  props:['testType','testId'],
  components: {
    countdown,
  },
  data() {
    return {
      jishi:false,
      loading:true,
      param:"1",
      textbox: null,
      Nav: 1,
      fanhui: fanhui1,
      geren: geren1,
      mulu: mulu1,
      dingbu: dingbu1,
      questionDx: [],
      questionDdx: [],
      questionPd: [],
      optionDX: [],
      optionDdx: [],
      optionPd: [],
      biaoji: xingxing, 
      yizuolist:0,
      testlist:0,
      biaoji1:xingxing1
    };
  },
  beforeCreate(){
             this.loading=true
         },

         updated(){
            this.loading=false
         },
  computed: {
    ...mapState(["testNav","examId"])
  },
  mounted() {
    document.getElementById('examtestlist').style.height=(window.innerHeight*0.70)+'px'
    // 试卷获取，答案格式转换，填充历史答案
    console.log(this.examId)
    var _this = this;
    this.$axios
      .post(
        "/CourseContentApi/getExamBroker",
        qs.stringify({
          id:_this.testId,
          examId:_this.examId
        })
      )
      .then(function(response) {
        if (response.data.code === 200) {
          _this.questionDdx = response.data.content.questionDdx;
          _this.questionDx = response.data.content.questionDx;
          _this.questionPd = response.data.content.questionPd;
           _this.testlist=response.data.content.questionDdx.length+response.data.content.questionDx.length+response.data.content.questionPd.length
          for (let i = 0; i < _this.questionDx.length; i++) {
            if( _this.questionDx[i].brokerAnswer!=null){
              _this.changebg('questionDx',i) 
              _this.$nextTick(() => {
              _this.$refs['Dx'+i][0].attributes.name.value=1
               _this.yizuolist=_this.yizuolist+1
              })
            }
            let tDx = _this.questionDx[i].option
              .split(";")
              .toString()
              .replace(/\"/g, "");
            _this.optionDX.push(tDx);
          }
            for (let i = 0; i < _this.questionDdx.length; i++) {
            if( _this.questionDdx[i].brokerAnswerDdx!=null){
              for(let ddx=0;ddx<_this.questionDdx[i].brokerAnswerDdx.length;ddx++){
                 _this.$nextTick(() => {
                let ddxt='DdxT'+i
                let dddxt=_this.questionDdx[i].brokerAnswerDdx[ddx]
                _this.$refs[ddxt][dddxt].checked=true
                 })
              }
               _this.$nextTick(() => {
              _this.$refs['Ddx'+i][0].attributes.name.value=1
               _this.yizuolist=_this.yizuolist+1
               })
               _this.changebg('questionDdx',i) 
            }
            let tDdx = _this.questionDdx[i].option
              .split(";")
              .toString()
              .replace(/\"/g, "");
            _this.optionDdx.push(tDdx);
          }

          for (let i = 0; i < _this.questionPd.length; i++) {
            if( _this.questionPd[i].brokerAnswer!=null){
              _this.changebg('questionPd',i) 
               _this.$nextTick(() => {
              _this.$refs['Pd'+i][0].attributes.name.value=1
              _this.yizuolist=_this.yizuolist+1
               })
            }
            let tPd = _this.questionPd[i].option
              .split(";")
              .toString()
              .replace(/\"/g, "");
            _this.optionPd.push(tPd);
          }
        } else {
          console.log(response);
        }
      });
  },
  methods: {
    //描点方法
    custormAnchor(anchorName) { 
      let anchorElement = document.getElementById(anchorName);
      let examtestlist=document.getElementById('examtestlist');
            let  total = anchorElement.offsetTop;
            console.log(anchorElement)
            //开始滚动
            // Chrome
            examtestlist.scrollTop = total-190
            // Firefox
            examtestlist.scrollTop = total-190
            // Safari
            examtestlist.pageYOffset = total-190
     },
      timeout: function() {
        this.jishi=true
        this.$alert('考试时间已结束', '通知', {
          confirmButtonText: '确认交卷',
          confirmButtonClass:'confirmButtonClass',
          center: true,
          showClose:false,
           closeOnClickModal:false,
          callback: action => {
           var _this = this;
      this.$axios
        .post("/CourseContentApi/submitExam")
        .then(function(response) {
           let brokerNum=response.data.brokerNum
            _this.$store.commit('changebrokerNum',brokerNum)
          _this.callbacksubmitExam(response.data.suc,response.data.err,response.data.score,response.data.performance)
         })
          }
        });
    },
    //  交卷
    submitExam(){
      if((this.testlist-this.yizuolist)!=0&&this.jishi==false){
       this.$alert('还有 '+(this.testlist-this.yizuolist)+' 道题未做，请继续答题！', '通知', {
          confirmButtonText: '继续答题',
          confirmButtonClass:'confirmButtonClass',
          center: true,
          showClose:false,
          closeOnClickModal:false,
        });
      }else{
        this.querenjiaoduan()
      } 
    },
         querenjiaoduan() {
      this.$alert('确认答题完成提交试卷', '通知', {
          showCancelButton:true,
          cancelButtonText:'我再做做',
          confirmButtonText: '确认交卷',
          confirmButtonClass:'confirmButtonClass',
          cancelButtonClass:'confirmButtonClass',
          center: true,
          showClose:false,
           closeOnClickModal:false,
        }).then(action => {
          var _this = this;
      this.$axios
        .post("/CourseContentApi/submitExam")
        .then(function(response) {
           let brokerNum=response.data.brokerNum
            _this.$store.commit('changebrokerNum',brokerNum)
          _this.callbacksubmitExam(response.data.suc,response.data.err,response.data.score,response.data.performance)
         })
        });
    },
    // 考试结果
    callbacksubmitExam(dui,cuo,s,p){
 const h = this.$createElement;
        this.$msgbox({
          title: '考试结果',
          message: h('p', null, [
            h('span', null, '答错 ：'),
            h('i', { style: 'color: red' }, cuo),
            h('div',null , ''),
            h('span',null , ' 答对 ：'),
            h('i', { style: 'color: teal' }, dui),
            h('div',null , ''),
            h('span',null , ' 总分 ：'),
            h('i', { style: 'color: teal' }, s),
            h('div',null , ''),
            h('span',null , ' 绩点 ：'),
            h('i', { style: 'color: teal' }, p)
          ]),
          // showCancelButton: true,
          confirmButtonText: '确定',
          confirmButtonClass:'confirmButtonClass',
          center: true,
          showClose:false,
          closeOnClickModal:false,
        }).then(action => {
          if(s>=90){
          this.$alert('恭喜您本次考试成绩合格，本章节考试通过！', '结果评定', {
          confirmButtonText: '我知道了',
          confirmButtonClass:'confirmButtonClass',
          center: true,
          showClose:false,
           closeOnClickModal:false,
        });
          }else{
          this.$alert('很遗憾本次考试成绩未合格，继续努力！', '结果评定', {
          confirmButtonText: '我知道了',
          confirmButtonClass:'confirmButtonClass',
          center: true,
          showClose:false,
           closeOnClickModal:false,
        });
          }
          
           this.$store.commit("changeindex", this.Nav);   
        })
    },
    changec(e,q,i) {
      this.$nextTick(() => {
          if (e.target.attributes[0].value == this.biaoji) {
            e.target.attributes[0].value = this.biaoji1;
            this.$refs[q+i][0].firstChild.style.background = "#ff803b";
          } else {
             e.target.attributes[0].value = this.biaoji
            if(q=='questionDx'){
              if(this.$refs['Dx'+i][0].attributes.name.value==1){
                this.$refs[q+i][0].firstChild.style.background = "#c7000a";
              }else{
              this.$refs[q+i][0].firstChild.style.background = "#c4c4c4";
              } 
            }else if(q=='questionDdx'){
              this.$refs[q+i][0].firstChild.style.background = "#c4c4c4";
              if(this.$refs['Ddx'+i][0].attributes.name.value==1){
                this.$refs[q+i][0].firstChild.style.background = "#c7000a";
              }else{
              this.$refs[q+i][0].firstChild.style.background = "#c4c4c4";
              }
            }else{
              this.$refs[q+i][0].firstChild.style.background = "#c4c4c4";
              if(this.$refs['Pd'+i][0].attributes.name.value==1){
                this.$refs[q+i][0].firstChild.style.background = "#c7000a";
              }else{
              this.$refs[q+i][0].firstChild.style.background = "#c4c4c4";
              }
            }
        }
      });
    },
    changebg(t,i) {
      let d=t+i
      this.$nextTick(() => {
      if(t=='questionDdx'){
       if(this.$refs['Ddx'+i][0].attributes.name.value==0){
         this.$refs[d][0].firstChild.style.background = "#c4c4c4";
       }else{
         this.$refs[d][0].firstChild.style.background = "#c7000a";
       }
      }else{
           this.$refs[d][0].firstChild.style.background = "#c7000a";
      }
      });
    },
    setoptionindexDdx(id,ind,i){
      let da=""
      let jilu=0
      let typeddx='Ddx'+i
      for(let j=0;j<this.$refs[ind].length;j++){
        if(this.$refs[ind][j].checked==true){
           da=da+this.$refs[ind][j].value
           jilu++
        }
      }
      if(jilu==0){
           let qi='questionDdx'+i
            this.$refs[typeddx][0].attributes.name.value=0
            this.yizuolist=this.yizuolist-1
            this.$refs[qi][0].firstChild.style.background = "#c4c4c4";
        }else{
           if(this.$refs[typeddx][0].attributes.name.value!=1&&jilu!=0){
            this.$refs[typeddx][0].attributes.name.value=1
            this.yizuolist=this.yizuolist+1
            }
        }
      var _this = this;
      this.$axios
        .post(
          "/CourseContentApi/saveExam",
          qs.stringify({
            id: id,
            option: da
          })
        )
        .then(function(response) {
          if (response.data.code === 200) {
            da=""
            jilu=0
          } else {
            console.log(response);
          }
        });
    },
    setoptionindex(id,ind,i) {
      var _this = this;
      this.$axios
        .post(
          "/CourseContentApi/saveExam",
          qs.stringify({
            id: id,
            option: i
          })
        )
        .then(function(response) {
          if (response.data.code === 200) {
            if(_this.$refs[ind][0].attributes.name.value!=1){
            _this.$refs[ind][0].attributes.name.value=1
            _this.yizuolist=_this.yizuolist+1
            }
          } else {
            console.log(response);
          }
        });
    },
    optionArrayDx(i) {
      this.textbox = i;
      return this.optionDX[i].split(",");
    },
    optionArrayDdx(i) {
      this.textbox = i;
      return this.optionDdx[i].split(",");
    },
    optionArrayPd(i) {
      this.textbox = i;
      return this.optionPd[i].split(",");
    },
    backUser(){
      this.$alert('退出本界面 本次考试将作废', '通知', {
          showCancelButton:true,
          cancelButtonText:'继续考试',
          confirmButtonText: '确认退出',
          confirmButtonClass:'confirmButtonClass',
          cancelButtonClass:'confirmButtonClass',
          center: true,
          showClose:false,
           closeOnClickModal:false,
        }).then(action => {
          let _this=this
          this.$axios.post("/CourseContentApi/clearExam").then(function(response) {
              _this.$router.push({ path: "/User" });
        });
        });
    },
    back() {
      this.$alert('退出本界面 本次考试将作废', '通知', {
          showCancelButton:true,
          cancelButtonText:'继续考试',
          confirmButtonText: '确认退出',
          confirmButtonClass:'confirmButtonClass',
          cancelButtonClass:'confirmButtonClass',
          center: true,
          showClose:false,
           closeOnClickModal:false,
        }).then(action => {
          let _this=this
          this.$axios.post("/CourseContentApi/clearExam").then(function(response) {
              _this.$store.commit("changeindex", _this.Nav)
        }); 
        });
    },
    changeindex1() {
      this.$store.commit("changeindex", this.Nav);
    },
    scrollTo() {
     this.$nextTick(() => {
        this.$refs.examtestlist.scrollTop = 0
      })

    },
    changecolor(e){
        e.target.style.color='#c7000a'
        switch(e.target.attributes.name.value){
        case 'fanhui':this.fanhui=fanhui2
         this.index=1
        break;
        case 'geren':this.geren=geren2
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
         this.index=2
        break;
        case 'mulu':this.mulu=mulu1
         this.index=3
        break;
        case 'dingbu':this.dingbu=dingbu1
         this.index=4
        break;
        }
        },
    callback(){},
  }
};
</script>
<style>
.list-span-h{
  width: 100%;
  height: 20px;
}
.exam-nav {
  background-color: white;
  float: left;
}
.exam-test {
  background-color: white;
  float: right;
}
@media screen and (min-width: 1349px) {
.exam-test{
width: 76%;
}
}
@media screen and (min-width: 1200px) and (max-width: 1349px) {
.exam-test{
  width: 76%;
}
}
@media screen and (max-width: 1200px) {
.exam-test{
  width: 74%;
}
}
.exam-test-list {
  overflow-y: scroll;
}

.exam-test-list-title span{
  /* display:block;
  float: left; */
}
.exam-test-list-title span:first-child{
  white-space: nowrap;
}
.exam-test-list-title-span{
   width: 90%;
   margin-bottom: 20px;
}
.exam-test-list h4{
  display: block;
  padding: 5px;
  margin-bottom: -10px;
  border-bottom: 1px solid black;
}
.exam-test-list div {
  padding: 0px 10px;
}
.exam-test-list ul {
  list-style: none;
  margin-left: -20px;
  /* position: relative; */
}
.exam-test-list-title {
  width: 80%;
  padding: 10px 10px;
  display: flex;
  flex-wrap: nowrap;
}
.exam-test-list-option {
  padding: 3px 78px;
  margin-left: 0px;
}
.exam-test-list-option>input{
  float: left;
  margin: 5px 5px;
}
.exam-test-list-option>span{
  display: inline-block;
  width: 90%;
}
.exam-test-list-img {
  width: 25px;
  float: right;
  padding-top: 10px;
  margin-right: 50px;
}
.exam-test-header {
  width:100%;
  height: 66px;
  box-shadow: 0px 1px 2px 0px #999999;
  overflow: hidden;
  background-color: white;
}
.exam-test-header > div {
  width: 220px;
  float: left;
  padding: 0px 5px;
}
.exam-test-header > div > h1 {
  height: 26px;
  font-size: 20px;
  display: inline-block;
  float: left;
  margin:20px 0px 0px 20px; 
}
.exam-test-header > div > h6{
  height: 14px;
  display: inline-block;
  float: left;
  margin: 5px 0px 0px 20px;
}
.exam-test-header-span {
  display: block;
    float: right;
  margin-right: 5%;
  color: #c7000a;
  padding: 20px 0px;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.exam-test-header-span:first-child {
  width: 25%;
 
}
.exam-test-header-span:last-child {
  width: 18%;
   margin-right: 0%;
}
#exam {
  cursor:default;
}
.exam-nav button {
  width: 80%;
  float: left;
  margin: 5px 10%;
  border: 0px;
  background-color: #c7000a;
  color: white;
  padding: 5px;
  border-radius: 15px;
  font-size: 13px;
  margin-bottom: 20px;
  cursor:pointer;
}
.exam-nav div {
  width: 210px;
  margin: 5px 5px;
  height: auto;
  overflow: hidden;
  padding-bottom: 8px;
}
.exam-nav div span {
  float: left;
  display: block;
}
.exam-nav-span1 {
  width: 100%;
  padding: 8px;
  font-size: 12px;
}
.exam-nav-span2 {
  margin: 4px 5px;
}
.exam-nav-span2 a:hover {
  background-color: #c7000a;
}
.exam-nav-span2 a {
  width: 25px;
  padding: 5px 0px;
  display: inline-block;
  text-decoration: none;
  color: white;
  text-align: center;
  background-color: #c4c4c4;
  border-radius: 3px;
  font-size: 14px;
}
.exam-nav ul {
  list-style: none;
  margin-left: -40px;
  margin-top: 0px;
}
.exam-nav ul li {
  width: 55px;
  padding: 10px 0px;
  font-size: 12px;
  text-align: center;
  background-color: white;
  color: #5d5d5d;
  float: left;
  cursor:pointer;
}
.exam-nav ul li a {
  color: #5d5d5d;
  text-decoration: none;
  font-size: 12px;
}
.exam-nav ul li img {
  width: 18px;
  display: block;
  margin: 5px auto;
}
</style>