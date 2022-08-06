import axios from '../utils/axiosUtils'
// 发送登录请求
export default {
    getHistory(data) {
        return axios.post('template/user/getHistory', data)
    }

}