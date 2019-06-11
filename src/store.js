import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'
Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    testNav:1,
    textId:null,
    examId:null,
    oldexamId:null,
    testName:null,
    baifenbi:0,
    schnum:0,
    st:null,
    pageIndexlist:null,
    rows:[],
    brokerNum:1,

  },

  mutations: {

    changerows(state,data){
      state.rows=data
    },
    changebrokerNum(state,data){
      state.brokerNum=data
    },
    changetotal(state,data){
      state.pageIndexlist=data
    },
    opentest(state,name){
      state.testName=name
    },
    openOldExam(state,id){
      state.oldexamId=id
    },
    setschnum(state,schnum){
      state.schnum=schnum
    },
    openText(state,id){
      state.textId=id
    },
    openExam(state,id){
      state.examId=id
    },
    changeindex(state,testNav){
        state.testNav=testNav
    },
    loginOut(state){
       state.testNav=1
    },
    baifenbi(state,zss){
      state.baifenbi=zss
    },
    jindu(state){
      if(state.testNav==3){
      axios.post("/CourseContentApi/saveCourseCataLog",qs.stringify({
    courseId:state.textId,scheduleNum:state.baifenbi
     })).then(function(response){
     state.baifenbi=0
});
}
    },
    ssetInterval(state){
      let _this=this
      let zss=state.schnum
      state.st=setInterval(function(){ 
        zss++;
        if(zss<=100){
          state.baifenbi=zss
      }else{
          clearInterval(state.st)
      }
        },3000)
  },
  clearI(state){
     clearInterval(state.st)
  },
  },
  getters:{
     
  },
  actions: {

  }
})
