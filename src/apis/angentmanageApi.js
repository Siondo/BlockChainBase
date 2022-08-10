import axios from '../utils/axiosUtils'
// 发送登录请求
export default {
    GetAngentmanages(id) {
        return axios.get(`/template/user/list?id=${id}`)
    },
    // 修改比例
    updateBeliel(data) {
        return axios.post('/template/user/updateBeliel', data)
    },
    // 修改钱包地址
    updateAddress(data) {
        return axios.post('/template/user/updateAddress', data)
    },
    // 冻结账户
    freezeAccount(data) {
        return axios.get(`/template/user/freezeAccount/${data}`)
    }
}