import backstageApi from '../apis/backstageApi'
export default {
    namespaced: true,
    state: {
        users: null,
    },
    mutations: {
        setData(state, data) {
            state.users = data
        },

    },
    actions: {
        async GetUserId({ commit }, data) {
            const res = await backstageApi.getUserId(data)
            console.log(res);
            commit('setData', res.data.data)
        },
    }
}