import axios from '../utils/axiosUtils'
// 发送登录请求
export default {
    getUserId(data) {
        return axios.post('/template/user/getUserInfo', data)
    },
    IsRegister(data) {
        return axios.post('/template/user/register', data)
    },
    FindLowerUser(id) {
        return axios.get(`/template/user/findLowerUser`)
    }
}