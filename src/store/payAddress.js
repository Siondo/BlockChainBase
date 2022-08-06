import payaddressApi from '../apis/payaddressApi'

export default {
    namespaced: true,
    state: {
        status: null,
        data: null,
        User: {}
    },
    mutations: {
        setStatus(state, data) {
            state.status = data
            // Object.assign(state, data)
        },
        setData(state, data) {
            state.data = data
        },
        setUser(state, data) {
            state.User = data
        }
    },
    actions: {
        async addmoneyAddresss({ commit }, data) {
            const res = await payaddressApi.addMoneyAddress(data)
        },
        async GetUserId({ commit }, data) {
            const res = await payaddressApi.getUserId(data)
            commit('setUser', res.data.data)
        }
    }
}