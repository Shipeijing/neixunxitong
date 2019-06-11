/* 
说明：目录页
功能：展示目录页内容
 */
<template>
    <div class="list" v-loading="loading">
        <div class="header"><h1>{{testType}}</h1><h1>{{testTypeEnglish}}</h1></div>
        <div class="mulu">目录</div>
        <button class="list-button" @click="openMask(testId)">开始测试</button>
        <div class="zhengwen">
            <ul v-for="(item,index) in rows" :key="index">
                <li class="li-le" @click="changeindex3(item.id,item.schnum)" style="color: #5d5d5d;">{{item.courseName}}</li>
                <li class="li-le"  @click="changeindex3(item.id,item.schnum)" style="font-size: 13px; color: #999999;">{{item.title}}</li>
                <li class="li-ri">
                <el-progress v-if="item.schnum==100" :percentage="item.schnum" status="success"></el-progress>
                <el-progress v-else :percentage="item.schnum"></el-progress>
                </li>
            </ul>
        </div>
        <dialogBar v-model="sendVal" type="danger" title="选择考试章节" :content="kaoshimulu" v-on:cancel="clickCancel()" @openExam="changeindex1" @danger="clickDanger()" @confirm="clickConfirm()" dangerText="Delete"></dialogBar>
        <!-- 分页 -->
        <div class="fenye">
             <el-pagination
             layout="prev, pager, next"
             :current-page.sync="currentPage1"
              :page-size=1
             @current-change="currentchange"
             :page-count="pageIndexlist">
             </el-pagination>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import qs from 'qs'
import dialogBar from '../common/dialog'
export default {
    props:['testType','testId','testTypeEnglish'],
    computed: mapState(['rows','pageIndexlist']),
    components:{
         dialogBar
    },
    data(){
        return{
            currentPage1: 1,
            loading:true,
            sendVal: false,
            testNav2:2,
            testNav3:3,
            sta:'',
            percentage:100,
            coursePage:1,
            records:0,
            kaoshimulu:[],
           }
         },
         beforeCreate(){
             this.loading=true
         },

         updated(){
            this.loading=false
         },
         mounted(){
            if(sessionStorage.getItem("currentPage1")){
               this.currentPage1=parseInt(sessionStorage.getItem("currentPage1"))
            }
        var _this=this
        this.$axios.post("/CourseContentApi/getCouerLog",qs.stringify({
         id:_this.testId,page:_this.currentPage1
        })).then(function(response){
          if (response.data.code === 200) {
           _this.$store.commit('changerows',response.data.course.rows)
           _this.$store.commit('changetotal',response.data.course.total)
           sessionStorage.setItem("currentPage1",_this.currentPage1);
           if(response.data.oldExam==1){
             _this.open()
           }
          } else {
            console.log("请求错误");
          }
        })
          if(this.percentage<100){
                  this.sta=''
                 
              }else{
                  this.sta='success'
              }
         },
        methods:{
             openMask(index){
            this.sendVal = true;
            var _this=this
        this.$axios.post("/CourseContentApi/getExamLogList",qs.stringify({
         courseCatalogId:index
        })).then(function(response){
          if (response.data.code === 200) {
             _this.kaoshimulu=response.data.examCourseCatalog
          } else {
            console.log("请求错误");
          }
        })
        },
        clickCancel(){
            console.log('点击了取消');
        },
        clickDanger(){
            console.log('这里是danger回调')
        },
        clickConfirm(){
            console.log('点击了confirm');
        },
        open() {
        this.$alert('点击继续上次未完成的考试', '通知', {
          confirmButtonText: '继续做题',
          confirmButtonClass:'confirmButtonClass',
          center: true,
          showClose:false,
          closeOnClickModal:false,
          callback: action => {
            this.$message({
              type: 'info',
              message: `正在进入考试`
            });
            this.changeindex1()
          }
        });
      },
        changeindex1(id){
        this.$store.commit('openExam',id)
          this.$store.commit('changeindex',this.testNav2)
        },
        changeindex3(id,schnum){
          this.$store.commit('setschnum',schnum)
          this.$store.commit('openText',id,schnum)
          this.$store.commit('changeindex',this.testNav3,)
        },
        // 切页请求
        currentchange(val){
        var _this=this
        this.$axios.post("/CourseContentApi/getCouerLog",qs.stringify({
         id:_this.testId,page:val
        })).then(function(response){
          if (response.data.code === 200) {
           _this.$store.commit('changerows',response.data.course.rows)
           _this.$store.commit('changetotal',response.data.course.total)
           sessionStorage.setItem("currentPage1",val);
          } else {
            console.log("请求错误");
          }
        }) 
        }
        }
    
}
</script>
<style>
.list{
    width:91%;
    height:100%;
    float: right;
    background-color: white;
    position: relative;
    cursor:default;
}
.confirmButtonClass{
    color: white;
    background-color: #c7000a;
    padding: 8px 50px;
    border: 0px;
}
.confirmButtonClass:focus{
     background-color: #c7000a;
     color: white;
}
.confirmButtonClass:hover{
    background-color: #c7000a;
    color: white;
}

.list-button{
    padding: 6px 20px;
    border: 0px;
    color: white;
    background-color: #c7000a;
    border-radius: 5px;
    float: right;
    margin: -30px 50px 0px 0px;
    cursor:pointer;
}
.header{
    width: 100%;
    text-align: center;
}
.header>h1{
    font-size: 15px;
}
.header>h1:first-child{
    width: 28%;
    border-bottom: 1px solid #999999;
    margin: 20px auto;
    padding-bottom: 15px;
    color: #c7000a;
}
.header>h1:last-child{
    width: 20%;
    margin: -30px auto;
    background-color: white;
    color: #999999;
}
.mulu{
    width: 7%;
    border-bottom: 1px solid #c7000a;
    color: #c7000a;
    margin: 40px 0px 10px 20px;
    padding-bottom: 7px;
    font-weight: 500;
}
.zhengwen{
  width: 90%;
  margin: 2% auto;
}
.zhengwen>ul{
    height: 70px;
    list-style: none;
    border-bottom: 1px dashed #999999;
    cursor:pointer;
}
.li-le{
width: 70%;
float: left;
margin-left: -40px;
margin-top: 5px;
margin-bottom: 5px;
}
.li-ri{
width: 200px;
float: right;
margin-top: -13px;
}
.el-progress-bar__inner{
    background-color: #ff803b;
}
.el-progress.is-success .el-progress-bar__inner {
    background-color: #ff803b;
}
.el-progress.is-success .el-progress__text{
    color: #ff803b;
}
.zhengwen>ul>li>button{
   padding: 5px 15px;
   border-radius: 5px;
   border: 0px;
   color: white;
}
.zhengwen>ul>li>button:last-child{
    margin-left: 15px;
}
.fenye{
    width: 100%;
    position: absolute;
    top: 92%;
    text-align: center;
    /* background-image: url('../../../static/test/Main-BG.png');
    background-position:center;
    background-repeat: no-repeat;
    background-size: 57%; */
}
</style>
