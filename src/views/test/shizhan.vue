/* 
说明：单类别主页
功能：导航目录、考试、查看内容，导航依据testNav
 */
<template>
    <div>
     <MainNav></MainNav>
    <div class="nav-test"><div>
           <TestNav :testId="testId"  v-if="testNav==1"></TestNav>
     <list :testId="testId" :testTypeEnglish="testTypeEnglish" :testType="testType" v-if="testNav==1"></list>
     <exam v-else-if="testNav==2" :testType="testType" :testId="testId"></exam>
     <Ttext v-else-if="testNav==3"></Ttext></div></div>
       <Footer></Footer>
    </div>
</template>
<script>
import MainNav from '../../components/common/MainNav.vue'
import TestNav from '../../components/common/TestNav.vue'
import Footer from '../../components/common/Footer.vue'
import list from '../../components/Test/list.vue'
import exam from '../../components/Test/exam.vue'
import Ttext from '../../components/Test/Ttext.vue'
import { mapState } from 'vuex'
export default {
        data(){
      return{
          testType:'实战宝典',
          testTypeEnglish:'actual combat treasure ',
          testId:6,
      }
    },
          mounted(){
        if(sessionStorage.getItem("token")==null){
           this.$router.replace({ path: "/Login" })
        }
    },
    components:{
        MainNav,
        TestNav,
        list,
        exam,
        Ttext,
        Footer
    },
        computed: mapState(['testNav'])
}
</script>
<style>

</style>
