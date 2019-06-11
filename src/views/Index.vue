<template>
  <div id="index">
    <div class="Layout-1">
      <img src="../../static/index/logo-index.png">
    </div>
    <div class="Layout-2">
    <img src="../../static/index/1111.png" alt="">
    </div>
    <div class="Layout-3">
    <img src="../../static/index/2222.png" alt="">
     </div>
     <div class="Layout-4">
    <img src="../../static/index/3333.png" alt="">
     </div>
    <div class="Layout-5">
      <img src="../../static/index/0.png" alt="">
          <div class="Layoutimg-1">
          <img src="../../static/index/111.png" alt="">
          <img class="Layoutimgimg" v-if="brokerNum>0" name="qiye" @click="openTest($event)" src="../../static/index/1.png" alt="">
          <img v-else src="../../static/index/11.png" alt="">
          </div>
          <div class="Layoutimg-2">
          <img src="../../static/index/222.png" alt="">
          <img class="Layoutimgimg" v-if="brokerNum>1" name="jingji" @click="openTest($event)" src="../../static/index/2.png" alt="">
          <img v-else src="../../static/index/22.png" alt="">
           </div>
          <div class="Layoutimg-3">
          <img src="../../static/index/333.png" alt="">
          <img class="Layoutimgimg" v-if="brokerNum>2" name="shangquan" @click="openTest($event)" src="../../static/index/3.png" alt="">
          <img v-else src="../../static/index/33.png" alt="">
           </div>
          <div class="Layoutimg-4">
          <img src="../../static/index/444.png" alt="">
          <img class="Layoutimgimg" v-if="brokerNum>3" name="jiaoyi" @click="openTest($event)" src="../../static/index/4.png" alt="">
          <img v-else src="../../static/index/44.png" alt="">
           </div>
          <div class="Layoutimg-5">
          <img class="Layoutimgimg" v-if="brokerNum>4" name="yinhang" @click="openTest($event)" src="../../static/index/5.png" alt="">
          <img v-else src="../../static/index/55.png" alt="">
          <img src="../../static/index/555.png" alt="">
           </div>
          <div class="Layoutimg-6">
          <img class="Layoutimgimg" v-if="brokerNum>5" name="shizhan" @click="openTest($event)" src="../../static/index/6.png" alt="">
          <img v-else src="../../static/index/66.png" alt="">
          <img src="../../static/index/666.png" alt="">
           </div>
          <div class="Layoutimg-7">
          <img class="Layoutimgimg" v-if="brokerNum>6" name="falu" @click="openTest($event)" src="../../static/index/7.png" alt="">
          <img v-else src="../../static/index/77.png" alt="">
          <img src="../../static/index/777.png" alt="">
           </div>
          <div class="Layoutimg-8">
          <img class="Layoutimgimg" v-if="brokerNum>7" name="xiangguan" @click="openTest($event)" src="../../static/index/8.png" alt="">
          <img v-else src="../../static/index/88.png" alt="">
          <img src="../../static/index/888.png" alt="">
          
           </div>
          <div class="Layoutimg-9">
          <img class="Layoutimgimg" v-if="brokerNum>8" name="gonggong" @click="openTest($event)" src="../../static/index/9.png" alt="">
          <img v-else src="../../static/index/99.png" alt="">
          <img src="../../static/index/999.png" alt="">
          
           </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
computed: mapState(['brokerNum']),
  data(){
    return{
    }
  },
  mounted(){

  },
   methods: {
    openTest: function(e) {
      switch (e.target.attributes.name.value) {
        case "qiye":
          this.$router.push({ name: "qiye" });
          break;
        case "jingji":
          this.$router.push({ name: "jingji" });
          break;
        case "shangquan":
          this.$router.push({ name: "shangquan" });
          break;
        case "jiaoyi":
          this.$router.push({ name: "jiaoyi" });
          break;
        case "yinhang":
          this.$router.push({ name: "yinhang" });
          break;
        case "shizhan":
          this.$router.push({ name: "shizhan" });
          break;
        case "falu":
          this.$router.push({ name: "falu" });
          break;
        case "xiangguan":
          this.$router.push({ name: "xiangguan" });
          break;
        case "gonggong":
          this.$router.push({ name: "gonggong" });
          break;
      }
    }
  }
}
</script>
<style>
@media screen and (min-width: 1349px) {
 .Layout-5{
  margin-left: 25%;
 }
}
@media screen and (min-width: 1200px) and (max-width: 1349px) {
 .Layout-5{
     margin-left: 25%;
 }
}
@media screen and (max-width: 1200px) {
   .Layout-5{
     margin-left: 17%;
 }
}
.Layoutimgimg{
  cursor:pointer;
  transition: all 0.6s;
  border-radius: 50px;
}
.Layoutimgimg:hover{
  transform: scale(1.4);
  box-shadow: 0px 0px 10px 5px white;
}
div[class^="Layoutimg"]{
  position: absolute;
  width: 10%;
}
div[class^="Layoutimg"]>img{
  width: 100%;
}
div[class^="Layoutimg"]>img:first-child{
  margin-bottom: 20px;
}
.Layoutimg-1{
  top:-15%;
  left:5%;
}
.Layoutimg-2{
  top:-23%;
  left:30%;
}
.Layoutimg-3{
  top:-24%;
  left:60%;
}
.Layoutimg-4{
  top:-18%;
  left:85%;
}
.Layoutimg-5{
  top:40%;
  left:95%;
}
.Layoutimg-6{
  top:68%;
  left:72%;
}
.Layoutimg-7{
  top:62%;
  left:45%;
}
.Layoutimg-8{
  top:75%;
  left:20%;
}
.Layoutimg-9{
  top:55%;
  left:-4%;
}
.Layout-5{
  width: 750px;
  float: left;
  margin-top: 10%;
  position: fixed;
}
.Layout-5>img:first-child{
  width: 100%;
}
#index{
  width: 100%;
  height: 100%;
  min-width:1000px;
}
.Layout-1 {
  width: 10%;
  position: absolute;
  top: 5%;
  left: 5%;
}
.Layout-2{
  width: 10%;
  position: absolute;
  top: 25%;
}
.Layout-2 img{
  width: 100%;
}
.Layout-3{
  width: 10%;
  height: 40%;
  float: right;
  margin-top: 3%;
}
.Layout-3 img{
  width: 100%;
  float: right;
}
.Layout-4{
 width: 100%;
 height: 29%;
 position: absolute;
 top: 71%;
}
.Layout-4 img{
  width: 80%;
  float: right;
}
</style>
