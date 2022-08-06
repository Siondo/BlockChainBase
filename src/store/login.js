import loginApi from '../apis/loginApi'
export default {
    namespaced: true,
    state: {
        data: null
    },
    mutations: {
        setData(state, data) {
            state.data = data
        }
    },
    actions: {
        async GoLogin({ commit }, data) {
            const res = await loginApi.IsLogin(data)
            if (res.data) {
                commit('setData', res.data)
            }
        }
    }
}