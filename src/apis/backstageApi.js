import axios from '../utils/axiosUtils'
// 发送登录请求
export default {
    getUserId(data) {
        return axios.post('/template/user/getUserInfo', data)
    },
    verifyPassWord(data) {
        return axios.post('/template/user/verifyPassWord', data)
    },
    updatePassWord(data) {
        return axios.post('/template/user/updatePassWord', data)
    }
}