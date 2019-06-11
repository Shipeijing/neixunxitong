/* 
说明：计时页
功能：考试页倒计时，内容页北京时间
 */
<template>
  <span :endTime="endTime" :callback="callback" :endText="endText">
    <slot>{{content}}</slot>
  </span>
</template> 
<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  props: {
    endTime: {
      type: String,
      default: ""
    },
    endText: {
      type: String,
      default: "已结束"
    },
    callback: {
      type: Function,
      default: ""
    },
    timeType: {}
  },
  mounted() {
    if (this.timeType == 1) {
      this.countdowm(this.endTime);
    } else {
      this.getNowTime();
    }
  },
  methods: {
    getNowTime() {
      let self = this;
      let timer = setInterval(function() {
        let nowTime = new Date();
        var year = nowTime.getFullYear();
        var month = nowTime.getMonth() + 1;
        var day = nowTime.getDate();
        var hours = nowTime.getHours();
        var minutes = nowTime.getMinutes();
        var seconds = nowTime.getSeconds();

        let format =
          "北京时间：" +
          `${year} 年 ${month} 月 ${day} 日 ${hours} 小时 ${minutes} 分 ${seconds} 秒`;
        self.content = format;
      }, 1000);
    },
    countdowm(timestamp) {
      let self = this;
      let pastTime = new Date();
      let pt = pastTime.getTime() + parseInt(timestamp);
      let timer = setInterval(function() {
        let nowTime = new Date();
        var t = pt - nowTime.getTime();
        if (t > 0) {
          let day = Math.floor(t / 86400000);
          let hour = Math.floor((t / 3600000) % 24);
          let min = Math.floor((t / 60000) % 60);
          let sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = "";
          if (day > 0) {
            format = `${day} 天 ${hour} 小时 ${min} 分 ${sec} 秒`;
          }
          if (day <= 0 && hour > 0) {
            format = `${hour} 小时 ${min} 分 ${sec} 秒`;
          }
          if (day <= 0 && hour <= 0) {
            format = `${min} 分 ${sec} 秒`;
          }
          self.content = format;
        } else {
          clearInterval(timer);
          self.content = self.endText;
          self._callback();
        }
      }, 1000);
    },
    _callback() {
      this.$emit("timeo");
      if (this.callback && this.callback instanceof Function) {
        this.callback(...this);
        alert("1");
      }
    }
  }
};
</script>