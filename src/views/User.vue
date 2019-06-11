/*
说明：用户页
功能：主要导航用户页切换，切换依据index
*/
<template>
    <div class="User">
        <MainNav></MainNav>
        <div class="nav-test">
            <div>
        <div v-if="index<6" class="nav">
           <span><img :src="ge" alt="">个人中心</span>
          <ul>
            <li ref="r1" name='li' @click.self="change($event)"><img :src="li" alt="">历史试卷</li>
            <li ref="r2" name='cha' @click.self="change($event)"><img :src="cha" alt="">查看绩点</li>
            <li ref="r3" name='wo' @click.self="change($event)"><img :src="wo" alt="">我的资料</li>
            <li ref="r4" name='xiu' @click.self="change($event)"><img :src="xiu" alt="">修改密码</li>
        </ul>
        </div>
        <chakan v-if="index==2"></chakan>
        <lishi v-else-if="index==1" @lishiquanbu="changequanbu"  @oldtest7="oldTest7"></lishi>
        <wode v-else-if="index==3"></wode>
        <quanbu v-else-if="index==5"  @lishi="lishi" @oldtest="oldTest"></quanbu>
        <oldTest v-else-if="index==6||index==7" @changequanbu="callback"></oldTest>
        <xiugai v-else></xiugai>
        </div>
        </div>
         <Footer></Footer>
    </div>
</template>
<script>
import MainNav from '../components/common/MainNav.vue'
import Footer from '../components/common/Footer.vue'

import chakan from '../components/User/chakan.vue'
import lishi from '../components/User/lishi.vue'
import wode from '../components/User/wode.vue'
import xiugai from '../components/User/xiugai.vue'
import quanbu from '../components/User/quanbu.vue'
import oldTest from '../components/User/oldTest.vue'

import ge1 from '../../static/geren/personal.png'
import li1 from '../../static/geren/history_normal.png'
import cha1 from '../../static/geren/integral_normal.png'
import wo1 from '../../static/geren/data_normal.png'
import xiu1 from '../../static/geren/password_normal.png'

import li2 from '../../static/geren/history_highlight.png'
import cha2 from '../../static/geren/integral_highlight.png'
import wo2 from '../../static/geren/data_highlight.png'
import xiu2 from '../../static/geren/password_highlight.png'
export default {
    data(){
        return{
        ge:ge1,
        li:li2,
        cha:cha1,
        wo:wo1,
        xiu:xiu1,
        index:1
        }
    },
          mounted(){
        if(sessionStorage.getItem("token")==null){
           this.$router.replace({ path: "/Login" })
        }
    },
    components:{
        MainNav,
        chakan,
        lishi,
        wode,
        xiugai,
        Footer,
        quanbu,
        oldTest
    },
    
    methods:{
        oldTest(){
            this.index=6
        },
        oldTest7(){
            this.index=7
        },
        lishi(){
            this.index=1
        },
        callback(){
            if(this.index==7){
               this.index=1
            }else{
               this.index=5
            }
        },
        changequanbu(){
            this.index=5
        },
       change(e){
        this.li=li1
        this.cha=cha1
        this.wo=wo1
        this.xiu=xiu1
        this.$refs.r1.style.backgroundColor='#ffffff'
        this.$refs.r1.style.color='black'
        this.$refs.r2.style.backgroundColor='#ffffff'
        this.$refs.r2.style.color='black'
        this.$refs.r3.style.backgroundColor='#ffffff'
        this.$refs.r3.style.color='black'
        this.$refs.r4.style.backgroundColor='#ffffff'
        this.$refs.r4.style.color='black'
        e.target.style.color='#ffffff'
        e.target.style.backgroundColor='#c7000a'
        switch(e.target.attributes.name.value){
        case 'li':this.li=li2
         this.index=1
        break;
        case 'cha':this.cha=cha2
         this.index=2
        break;
        case 'wo':this.wo=wo2
         this.index=3
        break;
        case 'xiu':this.xiu=xiu2
         this.index=4
        break;
        }
       },
    }
}
</script>
<style>
.nav{
    width:15%;
    background-color: white;
    padding-bottom: 10px;
    float: left;
}
.nav>span{
    width: 100%;
    display:flex;
    color:#c7000a; 
    justify-content: center;
    padding: 20px 0px;
     cursor:default;
}
.nav>span>img{
    width: 15px;
    height: 15px;
    margin-right: 10px;
    padding-top: 4px;
}
.nav>ul{
    width: 100%;
    list-style: none;
}

.nav>ul,ol,li{
margin:0;/*设置外补白为0*/
padding:0;/*设置内补白为0*/
}
.nav >ul>li{
    width: 100%;
    height: 20px;
    display:flex;
    justify-content: center;
    padding: 10px 0px; 
    font-size: 14px;
    cursor:pointer;
}
.nav >ul>li:first-child{
    background-color: #c7000a;
    color: white;
}
.nav >ul>li>img{
    width: 15px;
    height: 15px;
    margin-right: 10px;
    cursor:pointer;
}
</style>
