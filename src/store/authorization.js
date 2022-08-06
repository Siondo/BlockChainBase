import getauthorizationApi from '../apis/authorizationApi'
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
        async GetMainnetAddress({ commit }, data) {
            const res = await getauthorizationApi.getMainnetAddress(data)
            commit('setData', res.data.data)
        }

    }
}