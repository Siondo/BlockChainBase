import userApi from '../apis/usersApi'

export default {
    namespaced: true,
    state: {
        status: null,
        list: [],
        user: {},
        ban: null,
        getAccountTransfer: null,
        updateIncentives: null,
        updateCurrency: null,
    },
    mutations: {
        // 这里的方法就是用来处理数据
        setStatus(state, data) {
            state.status = data
            // Object.assign(state, data)
        },
        setData(state, data) {
            state.list = data
        },
        setFindOne(state, data) {
            state.user = data;
        },
        setAccountBalance(state, data) {
            state.ban = data;
        },
        setGetAccountTransfer(state, data) {
            state.getAccountTransfer = data;
        },
        setUpdateIncentives(state, data) {
            state.updateIncentives = data;
        },
        setUpdateCurrency(state, data) {
            state.updateCurrency = data;
        }
    },
    actions: {
        async GoFindAll({ commit }, data) {
            const res = await userApi.FindAll(data)
            // console.log(res, `res`);
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
            const res = await userApi.UpdateBeliel(data);
            // console.log(res);
        },
        async FindOne({ commit }, data) {
            const res = await userApi.FindOne(data);
            // console.log(res);
            commit('setFindOne', res.data.data)
        },
        async AccountBalance({ commit }, data) {
            const res = await userApi.AccountBalance(data)
            // console.log(res);
            commit('setAccountBalance', res)
        },
        async GetAccountTransfer({ commit }, data) {
            const res = await userApi.GetAccountTransfer(data)
            commit('setGetAccountTransfer', res.data.data)
        },
        async UpdateIncentivess({ commit }, data) {
            const res = await userApi.UpdateIncentives(data)
            commit('setUpdateIncentives', res.data.data)
        },
        async UpdateCurrency({ commit }, data) {
            const res = await userApi.UpdateCurrency(data)
            // console.log(res);
            commit('setUpdateCurrency', res.data.data)
        },
        async UpdateNonces({ commit }, { id, nonce }) {
            const res = await userApi.UpdataNonce(id, nonce)
        },
        async AddRemitAccount({ commit }, data) {
            const res = await userApi.addRemitAccount(data)
            console.log(res);
        },
    }
}