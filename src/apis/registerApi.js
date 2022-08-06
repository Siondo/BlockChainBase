import axios from '../utils/axiosUtils'
// 发送登录请求
export default {
    IsRegister(data) {
        console.log(data);
        return axios.post('template/user/register', data)
    },
    // 修改比例
    updateBeliel(num) {
        return axios.post('/template/user/updateBeliel', num)
    }

}