import axios from '../utils/axiosUtils'
// 发送登录请求
export default {
    FindAll(id) {
        // console.log(data);
        return axios.get(`/template/user/findAll/${id}`)
    },
    FindOne(userId) {
        // console.log(userId);
        return axios.post('/template/user/findOne', userId)
    },
    UpdateBeliel(data) {
        // console.log(data);
        return axios.post('/template/user/updateBeliel', data)
    },
    AccountBalance(data) {
        // console.log(data);
        return axios.put('/template/user/updateAccountBalance', data)
    },
    GetAccountTransfer(data) {
        return axios.put('/template/user/getAccountTransfer', data)
    },
    UpdateIncentives(data) {
        // console.log(data);
        return axios.post('/template/user/updateIncentives', data)
    },
    UpdateCurrency(data) {
        // console.log(data);
        return axios.put('/template/user/updateCurrency', data)
    },
    UpdataNonce(id, nonce) {
        return axios.get(`/template/user/updateNonce/${id}/${nonce}`);
    },
    // 添加划账记录
    addRemitAccount(data) {
        return axios.post(`/template/user/addRemitAccount`, data)
    }
}