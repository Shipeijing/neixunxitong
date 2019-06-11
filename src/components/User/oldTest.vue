/* 
说明：历史试卷页
功能：展示历史试卷
 */
<template>
    <div  id="oldTest"  v-loading="loading">
      <div class="oldTest-nav">
      <div>
        <span class="oldTest-nav-span1">单选题：</span>
        <span
          class="oldTest-nav-span2"
          :ref="'questionDx'+index"
          v-for="(item,index) in questionDx"
          :key="index"
        >
          <a href="" @click.prevent="custormAnchor('Dx'+index)">{{index+1}}</a>
        </span>
      </div>
      <div style="border-top:1px dashed #999999;">
        <span class="oldTest-nav-span1">多选题：</span>
        <span
          class="oldTest-nav-span2"
          v-for="(item,index) in questionDdx"
           :ref="'questionDdx'+index"
          :key="index"
        ><a href="" @click.prevent="custormAnchor('Ddx'+index)">{{index+1}}</a>
        </span>
      </div>
      <div style="border-top:1px dashed #999999;">
        <span class="oldTest-nav-span1">判断题：</span>
        <span
          class="oldTest-nav-span2"
          :ref="'questionPd'+index"
          v-for="(item,index) in questionPd"
          :key="index"
        >
          <a href="" @click.prevent="custormAnchor('Pd'+index)">{{index+1}}</a>
        </span>
      </div>
      </div>
      <div class="oldTest-list">
        <div class="quanbu-div-1">
          <span>试卷详情</span> 
       </div>
       <div class="quanbu-div-2"><button @click="callquanbu()">返 回</button></div>
        <div id="examtestlist" class="exam-test-list" unselectable="on" onselectstart="return false;">
        <div>
           <h4>单选题</h4>
          <ul v-for="(item,index) in questionDx" :key="index">
           
            <li class="exam-test-list-title" :id="'Dx'+index"><span>第 {{index+1}} 题： </span><span class="exam-test-list-title-span">{{item.name}}</span></li>
            <li
              class="exam-test-list-option"
              v-for="(optionitem,optionindex) in optionArrayDx(index)"
              :key="optionindex"
            >
              <input
                type="radio"
                :name="'Dx'+index"
                :value="optionindex"
                v-model="item.brokerAnswer"
                style="margin-right: 10px;"
                disabled="disabled"
              >
              <span>{{optionitem}}</span>
            </li>
             <span style="padding-left: 50px">答案 ：{{item.answer}}</span>
          </ul>
        </div>
         <div>
            <h4>多选题</h4>
          <ul v-for="(item,index) in questionDdx" :key="index">
            
            <li class="exam-test-list-title" :id="'Ddx'+index"><span>第 {{index+1}} 题： </span><span class="exam-test-list-title-span">{{item.name}}</span></li>
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
                style="margin-right: 10px;"
                :value="optionindex"
                disabled="true" 
              >
              <span>{{optionitem}}</span>
            </li>
            <span style="padding-left: 50px;">答案 ：{{item.answer}}</span>
          </ul>
        </div>
       <div>
          <h4>判断题</h4>
          <ul v-for="(item,index) in questionPd" :key="index">
           
            <li class="exam-test-list-title" :id="'Pd'+index"><span>第 {{index+1}} 题： </span><span class="exam-test-list-title-span">{{item.name}}</span></li>
            <li
              class="exam-test-list-option"
              v-for="(optionitem,optionindex) in optionArrayPd(index)"
              :key="optionindex"
           >       
              <input type="radio" :name="'Pd'+index" style="margin-right: 10px;" :value="optionindex"
                v-model="item.brokerAnswer" disabled="disabled"
              >
              <span>{{optionitem}}</span>
            </li>
             <span style="padding-left: 50px">答案 ：{{item.answer}}</span>
          </ul>
        </div>
      </div>
      </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import qs from 'qs'
export default {
    computed: mapState(['oldexamId']),
    data(){
        return{
          loading:true,
      questionDx: [],
      questionDdx: [],
      questionPd: [],
      optionDX: [],
      optionPd: [],
      optionDdx: [],
        }
    },
             beforeCreate(){
             this.loading=true
         },

         updated(){
            this.loading=false
         },
    mounted(){
        document.getElementById('examtestlist').style.height=(window.innerHeight*0.67)+'px'
        var _this=this
         this.$axios.post("/CourseContentApi/getExamDetails/",qs.stringify({
             examId:_this.oldexamId
         })).then(function(response){
           console.log(response)
          _this.questionDdx = response.data.content.questionDdx;
          _this.questionDx = response.data.content.questionDx;
          _this.questionPd = response.data.content.questionPd;
          for (let i = 0; i < _this.questionDx.length; i++) {
            let d='questionDx'+i
            let tDx = _this.questionDx[i].option
              .split(";")
              .toString()
              .replace(/\"/g, "");
            _this.optionDX.push(tDx);
             _this.$nextTick(() => {
               console.log(_this.questionDx.isErr)
            if(_this.questionDx[i].isErr=='1'){
                 _this.$refs[d][0].firstChild.style.background = "#55c335";
            }else{
              _this.$refs[d][0].firstChild.style.background = "#c7000a";
            }
             })
          }
           for (let i = 0; i < _this.questionDdx.length; i++) {
              let d='questionDdx'+i
            if( _this.questionDdx[i].brokerAnswerDdx!=null){
              for(let ddx=0;ddx<_this.questionDdx[i].brokerAnswerDdx.length;ddx++){
                 _this.$nextTick(() => {
                let ddxt='DdxT'+i
                let dddxt=_this.questionDdx[i].brokerAnswerDdx[ddx]
                _this.$refs[ddxt][dddxt].checked=true
                 })
              }
            }
            let tDdx = _this.questionDdx[i].option
              .split(";")
              .toString()
              .replace(/\"/g, "");
            _this.optionDdx.push(tDdx);
            _this.$nextTick(() => {
            if(_this.questionDdx[i].isErr==1){
                 _this.$refs[d][0].firstChild.style.background = "#55c335";
            }else{
              _this.$refs[d][0].firstChild.style.background = "#c7000a";
            }
             })
          }


          for (let i = 0; i < _this.questionPd.length; i++) {
            let d='questionPd'+i
            let tPd = _this.questionPd[i].option
              .split(";")
              .toString()
              .replace(/\"/g, "");
            _this.optionPd.push(tPd);
            _this.$nextTick(() => {
            if(_this.questionPd[i].isErr==1){
                 _this.$refs[d][0].firstChild.style.background = "#55c335";
            }else{
              _this.$refs[d][0].firstChild.style.background = "#c7000a";
            }
             })
          }
        }) 
    },
    methods:{
      custormAnchor(anchorName) { 
      let anchorElement = document.getElementById(anchorName);
      let examtestlist=document.getElementById('examtestlist');
            let  total = anchorElement.offsetTop;
            //开始滚动
            // Chrome
            examtestlist.scrollTop = total-200
            // Firefox
            examtestlist.scrollTop = total-200
            // Safari
            examtestlist.pageYOffset = total-200
     },
      // 返回上一层
        callquanbu(){
            this.$emit("changequanbu")  
        },
        // 三个试题的答案格式修改
     optionArrayDx(i) {
      this.textbox = i;
      return this.optionDX[i].split(",");
    },
    optionArrayPd(i) {
      this.textbox = i;
      return this.optionPd[i].split(",");
    },
        optionArrayDdx(i) {
      this.textbox = i;
      return this.optionDdx[i].split(",");
    }, 
    }
}
</script>
<style>
.oldTest-nav {
  width: 21%;
  float: left;
  background-color: white;
}
.oldTest-nav button {
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
.oldTest-nav div {
  width:94%;
  margin: 5px auto;
  height: auto;
  overflow: hidden;
  padding-bottom: 8px;
}
.oldTest-nav div span {
  float: left;
  display: block;
}
.oldTest-nav-span1 {
  width: 100%;
  padding: 8px;
  font-size: 12px;
}
.oldTest-nav-span2 {
  margin: 4px 5px;
}
/* .oldTest-nav-span2 a:hover {
  background-color: #c7000a;
} */
.oldTest-nav-span2 a {
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
.oldTest-nav ul {
  list-style: none;
  margin-left: -40px;
  margin-top: 0px;
}
.oldTest-nav ul li {
  width: 55px;
  padding: 10px 0px;
  font-size: 12px;
  text-align: center;
  background-color: white;
  color: #5d5d5d;
  float: left;
  cursor:pointer;
}
.oldTest-nav ul li a {
  color: #5d5d5d;
  text-decoration: none;
  font-size: 12px;
}
.oldTest-nav ul li img {
  width: 18px;
  display: block;
  margin: 5px auto;
}

.oldTest-list{
  width: 78%;
   float: right;
   height: 100%;
   background-color: white;
   cursor:default;
}
.exam-test-list {
   width:95%;
    margin-left: 5%;
    min-height: 440px;
    overflow-y: scroll;
     background-color: white;
     cursor:default;
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
}
.exam-test-list-title {
  padding: 10px 10px;
}
.exam-test-list-option {
  padding: 3px 78px;
  margin-left: 0px;
}
.exam-test-list-img {
  width: 25px;
  float: right;
  margin-top: 10px;
  margin-right: 50px;
}
</style>
