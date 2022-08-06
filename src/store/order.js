import orderApi from '../apis/orderApi'
export default {
    namespaced: true,
    state: {
        dataList: null
    },
    mutations: {
        setData(state, data) {
            state.dataList = data
        }
    },
    actions: {
        // 获取历史记录
        async GetHistory({ commit }, data) {
            const res = await orderApi.getHistory(data)
            commit('setData', res.data)
        }
    }
}