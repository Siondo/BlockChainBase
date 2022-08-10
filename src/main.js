import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./utils/register.js";
import 'lib-flexible/flexible.js'
import * as echarts from 'echarts'
// 导入ICon 资源
import './assets/icon/iconfont.css';

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");



