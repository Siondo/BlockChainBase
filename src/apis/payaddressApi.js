import axios from '../utils/axiosUtils'
// 发送登录请求
export default {
    // 储存地址
    addMoneyAddress(data) {
        return axios.post('/template/user/addMoneyAddress', data)
    },
    getUserId(data) {
        return axios.post('/template/user/getUserInfo', data)
    },

}