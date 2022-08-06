import axios from '../utils/axiosUtils'
// 发送登录请求
export default {
    // 查找激励百分比
    findIncentives(data) {
        return axios.get(`/template/user/findIncentives/${data}`,)
    },
    UpdateBeliel(data) {
        // console.log(data);
        return axios.post('/template/user/updateBeliel', data)
    },
    // 修改激励百分比
    UpdateIncentives(data) {
        return axios.post('/template/user/updateIncentives', data)
    },
    UpdateIncentivesMoney(data) {
        return axios.post('/template/user/updateIncentivesMoney', data)
    },
    // 获取登录用户所有信息
    FindOne(userId) {
        // console.log(userId);
        return axios.post('/template/user/findOne', userId)
    },
}