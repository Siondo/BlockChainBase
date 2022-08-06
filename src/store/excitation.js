import excitationApi from '../apis/excitationApi'
export default {
    namespaced: true,
    state: {
        data: null,
        updateIncentives: null,
        updateIncentivesMoneyData: null,
        user: {}
    },
    mutations: {
        setData(state, data) {
            state.data = data
        },
        setFindOne(state, data) {
            state.user = data;
        },
        setUpdateIncentives(state, data) {
            state.updateIncentives = data;
        },
        setUpdateIncentivesMoney(state, data) {
            state.updateIncentivesMoneyData = data;
        },
    },
    actions: {
        async FindIncentives({ commit }, data) {
            const res = await excitationApi.findIncentives(data)
            res.data.data.forEach((item) => {
                if (item.ethMainnetAddress) {
                    item.chainType = 'ETH'
                    item.coinType = 'USDT',
                        item.tempAddress = item.ethMainnetAddress
                } else if (item.trcMainnetAddress) {
                    item.chainType = 'TRC'
                    item.coinType = 'USDT'
                    item.tempAddress = item.trcMainnetAddress
                } else if (item.bscMainnetAddress) {
                    item.chainType = 'BSC'
                    item.coinType = 'USDT'
                    item.tempAddress = item.bscMainnetAddress
                }
            })
            commit('setData', res.data.data)
        },
        async UpdateBeliel({ commit }, data) {
            const res = await excitationApi.UpdateBeliel(data);
        },
        async UpdateIncentivess({ commit }, data) {
            const res = await excitationApi.UpdateIncentives(data)
            console.log(res, `res`);
            commit('setUpdateIncentives', res.data.data)
        },
        async UpdateIncentivesMoney({ commit }, data) {
            const res = await excitationApi.UpdateIncentivesMoney(data)
            commit('setUpdateIncentivesMoney', res.data)
        },
        // 获取登录用户所有信息
        async FindOne({ commit }, data) {
            const res = await excitationApi.FindOne(data);
            // console.log(res);
            commit('setFindOne', res.data.data)
        },
    }
}