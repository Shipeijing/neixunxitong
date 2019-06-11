import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import index from './views/Index.vue'
// import User from './views/User.vue'
Vue.use(Router)
const router=new Router({
  linkActiveClass: 'active',
    routes: [
    {//主页
      path: '/',
      name: 'Index',
      component: index
    },
    {//登录
      path: '/Login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {//用户
      path: '/User',
      name: 'User',
      component: () => import('./views/User.vue'),
    },
     {//企业文化
      path: '/qiye',
      name: 'qiye',
      component: () => import('./views/test/qiye.vue'),
    
    },
     {//经济概论
      path: '/jingji',
      name: 'jingji',
      component: () => import('./views/test/jingji.vue'),
    
    },
     {//商圈
      path: '/shangquan',
      name: 'shangquan',
      component: () => import('./views/test/shangquan.vue'),
    
    },
     {//交易
      path: '/jiaoyi',
      name: 'jiaoyi',
      component: () => import('./views/test/jiaoyi.vue'),
     
    },
     {//实战
      path: '/shizhan',
      name: 'shizhan',
      component: () => import('./views/test/shizhan.vue'),
     
    },
     {//银行
      path: '/yinhang',
      name: 'yinhang',
      component: () => import('./views/test/yinhang.vue'),
    
    },
     {//法律
      path: '/falv',
      name: 'falu',
      component: () => import('./views/test/falv.vue'),
      
    },
     {//相关
      path: '/xiangguan',
      name: 'xiangguan',
      component: () => import('./views/test/xiangguan.vue'),
    
    },
     {//相关
      path: '/gonggong',
      name: 'gonggong',
      component: () => import('./views/test/gonggong.vue'),
    
    },
    {
      path:'**',//错误路由重定向
      redirect:'/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const testNavRoute = ['qiye', 'jingji', 'shangquan','jiaoyi','shizhan','yinhang','falu','xiangguan','gonggong']
  if (testNavRoute.indexOf(from.name) >= 0) {
    store.commit('clearI')
      store.commit('jindu')
    if (store.state.testNav==1){
      //router.push({ name: 'User' });
    }else{
      store.state.testNav=1;
      let path=from.path
      next(path);
    }
  }
  const nextRoute = ['Index','User', 'qiye', 'jingji', 'shangquan','jiaoyi','shizhan','yinhang','falu','xiangguan','gonggong'];
  let isLogin =sessionStorage.getItem("token");  // 是否登录
  if (nextRoute.indexOf(to.name) >= 0) {  
    if (isLogin==null) {
      router.push({ name: 'Login' })
    }
  }
  if (to.name === 'Login') {
    if (isLogin!=null) {
      router.push({ name: 'User' });
    }
  }
 next();
});
export default router;