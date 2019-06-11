"use strict"

import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import store from '../store'

let config={
    //  baseURL:'http://10.100.88.75:8080/',
    baseURL:'http://188.131.151.194/shzy-exam/',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':'application/x-www-form-urlencoded'},
};
const _axios=axios.create(config)

//请求拦截处理
_axios.interceptors.request.use(
function(config){
  if(sessionStorage.getItem("token")){
      config.headers.token=JSON.parse(sessionStorage.getItem("token"))
  }
  return config;
},function(error){
  return Promise.reject(error)
});
//响应拦截处理
_axios.interceptors.response.use(
function(response){
if(response.data.code===404){alert(response.data.message)}
else if(response.data.code===12406){
        sessionStorage.clear()
        store.commit('loginOut')
        router.replace({ path: "/Login" });
    alert("账号已在其他设备登录！")
}
return response
},function(error){
    return Promise.reject(error);
});

Plugin.install=function(Vue){
    Vue.axios=_axios
    window.axios=_axios
    Object.defineProperties(Vue.prototype,{
        axios:{
            get(){
              return _axios
            }
        },
        $axios:{
            get(){
               return _axios
            }
        },
    })
}
Vue.use(Plugin)
export default Plugin