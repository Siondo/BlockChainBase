import backstageApi from '../apis/backstageApi'
export default {
    namespaced: true,
    state: {
        users: null,
        verifyPassWordRes: null,
        nowPassWordRes: null,
    },
    mutations: {
        setData(state, data) {
            state.users = data
        },
        setverifyPassWordRes(state, data) {
            state.verifyPassWordRes = data
        },
        setnowPassWordRes(state, data) {
            state.nowPassWordRes = data
        }
    },
    actions: {
        async GetUserId({ commit }, data) {
            const res = await backstageApi.getUserId(data)
            console.log(res);
            commit('setData', res.data.data)
        },
        async UpdatePassWord({ commit }, data) {
            const res = await backstageApi.updatePassWord(data)
            console.log(res);
            commit('setnowPassWordRes', res.data)
        },
        async VerifyPassWord({ commit }, data) {
            const res = await backstageApi.verifyPassWord(data)
            console.log(res);
            commit('setverifyPassWordRes', res.data)
        }
    }
}