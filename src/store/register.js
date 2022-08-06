import registerApi from '../apis/registerApi'
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
        async GoRegister({ commit }, data) {
            const res = await registerApi.IsRegister(data)
            commit('setData', res.data)
        }
    }
}