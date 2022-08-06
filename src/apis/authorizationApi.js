import axios from '../utils/axiosUtils'
// 发送登录请求
export default {
    getMainnetAddress(data) {
        return axios.post(`/template/user/findOne/`, data)
    },
}