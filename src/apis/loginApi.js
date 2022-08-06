import axios from '../utils/axiosUtils'
// 发送登录请求
export default {
    IsLogin(data) {
        return axios.post('template/user/login', data)
    }

}