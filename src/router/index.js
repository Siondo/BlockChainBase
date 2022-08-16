import Vue from "vue";
import VueRouter from "vue-router";
import { MessageBox } from "element-ui";  // 引入


import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import Main from '../components/Home_Main.vue'
// 分享链接
import Shore from '../components/Home_Shore.vue'
// 我的
import Me from '../components/Home_Me.vue'
// 后台管理页面
import Backstage from '../views/Backstage.vue'
// 后台管理模块
import CreateAccount from '../components/Back_createAccount.vue'
import Payaddress from '../components/Back_Payaddress.vue'
import Excitation from '../components/Back_excitation.vue'
import Authorization from '../components/Back_authorization.vue'
// 代理管理
import Angentmanage from '../components/Back_angentmanage.vue'
import User from '../components/Back_user.vue'
import Order from '../components/Back_order.vue'
Vue.use(VueRouter);

const routes = [

  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/home/main',
    children: [
      {
        path: "main",
        name: "main",
        component: Main,
      },
      {
        path: "shore",
        name: "shore",
        component: Shore,
      },
      {
        path: "me",
        name: "me",
        component: Me,
      },
      {
        path: "/home/main/:address/:ETH/:BSC/:TRC/:str",
        name: "home",
        component: Home,
      },
      {
        path: "/home/main/:address",
        name: "home",
        component: Home,
      },
    ]
  },
  {
    path: "/",
    name: "login",
    component: Login,
    // 重定向
    redirect: '/login',
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    // 重定向
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    // 重定向
  },
  {
    path: '/backstage',
    name: 'backstage',
    component: Backstage,
    redirect: '/backstage/payaddress',
    children: [
      {
        path: 'createAccount',
        name: 'createAccount',
        component: CreateAccount
      },
      {
        path: 'payaddress',
        name: 'payaddress',
        component: Payaddress,
      },
      {
        path: 'excitation',
        name: 'excitation',
        component: Excitation,
      },
      {
        path: 'authorization',
        name: 'authorization',
        component: Authorization,
      },
      {
        path: "angentmanage",
        name: 'angentmanage',
        component: Angentmanage,
      }, {
        path: 'user',
        name: 'user',
        component: User,
      }, {
        path: 'order',
        name: 'order',
        component: Order,
      },
    ]
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import('@/components/NotFound.vue'),
  },
  {
    path: '*',
    name: 'NotFound',
    redirect: '/404',
    component: () => import('@/components/NotFound.vue')
  }

];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log('beforeEach', to, from);
  if (to.path !== '/login' && to.path !== '/register' && to.path !== '/home/main') {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      MessageBox.alert('即将前往登陆', '找不到你的账号', {
        confirmButtonText: '确定',
        callback: action => {
          window.location.href = "/"
        }
      })
    }
  }
  next();
});

export default router;
