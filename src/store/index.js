import Vue from "vue";
import Vuex from "vuex";
// 登录模型
import Login from './login'
// 注册模型

import User from './user'
// 用户模块
import Register from './register'
// 注册账户模型
import CreateAccount from './register'
// 代理管理模块
import Angentmanage from './angentmanage'
// 分享链接验证
import Home from './home'
// 添加钱包地址
import payAddress from './payAddress'
// home授权
import Excitation from './excitation'
// 激励模块
import Authorization from './authorization'
import Backstage from './backstage'
// 授权链接模块
// 历史记录模块
import Order from './order'
Vue.use(Vuex);

export default new Vuex.Store({
  // 分享链接验证
  state: {
    isLoading: false//loading全局开关
  },
  getters: {},
  mutations: {
    changeisLoading(state, data) {
      state.isLoading = data
    }
  },
  actions: {},
  modules: { Login, Register, CreateAccount, Angentmanage, User, Home, payAddress, Excitation, Authorization, Backstage, Order },
});
