import axios from "axios";
import { Message, } from 'element-ui'
import store from '../store/index'
// const axiosInstance = axios.create();
// //超时时间
// axiosInstance.defaults.timeout = 3000;
// //请求的根路径【我配置在常量文件中】
// axiosInstance.defaults.baseURL = 'http://47.94.165.172:9090';
// const axiosInstance = axios.create({
//     baseURL: "http://192.168.0.107:9090",
//     timeout: 3000,
// });
// const axiosInstance = axios.create({
//     baseURL: "/api/",
//     timeout: 3000,
// });
const axiosInstance = axios.create({
    baseURL: "https://api.siondo.cn",
    timeout: 3000,
});

// 配置请求拦截器和响应拦截器
axiosInstance.interceptors.request.use(
    (request) => {
        // 改变vuex中的isLoading状态数据，当为true，loading显示
        store.state.isLoading = true
        // 获取本地的token
        let token = sessionStorage.getItem("token");
        // 如果token存在就将token放进请求头中
        if (token) {
            request.headers.token = token;
        }
        // 将token更新后返回这个request
        return request;
        // 如果请求错误，抛出系统异常
    },
    (error) => {
        Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        //loading隐藏
        store.state.isLoading = false
        // 拦截到回应的请求后 正常返回给浏览器
        return response;
    },
    // 拦截到异常后自定义处理异常情况
    (error) => {
        const response = error.response;
        // 获取拦截到response
        if (response) {
            // 判断response里面的状态码响应对应状态的内容
            switch (response.status) {
                case 500:
                    // message.error("服务器在休息，请稍后再访问！！");
                    Message({
                        message: '服务器在休息，请稍后再访问！！',
                        type: 'error'
                    });
                    break;
                case 401:
                    // message.error("身份过期，请重新登录");
                    Message({
                        message: '请耐心等待，服务器连接中...',
                        type: 'error'
                    });
                    localStorage.removeItem("token");
                    localStorage.removeItem("userInfo");
                    // 使用window方法跳转到登录页，将会清空缓存等数据，相当于刷新了一次页面
                    window.location.href = "/";
                    break;
                case 404:
                    // message.error("地址错误！！");
                    Message({
                        message: '地址错误！！',
                        type: 'error'
                    });
                    break;
                default:
                    // message.error("页面发生错误，请稍后重试!!");
                    Message({
                        message: '页面发生错误，请稍后重试!!',
                        type: 'error'
                    });
                    break;
            }
        }
        store.state.isLoading = false
    }
);
export default axiosInstance;
