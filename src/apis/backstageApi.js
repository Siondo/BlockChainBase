import axios from '../utils/axiosUtils'
// 发送登录请求
export default {
    getUserId(data) {
        return axios.post('/template/user/getUserInfo', data)
    }
}