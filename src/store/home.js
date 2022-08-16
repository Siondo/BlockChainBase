import homeApi from "@/apis/homeApi";
import registerApi from '../apis/registerApi'
export default {
    namespaced: true,
    state: {
        dataList: [],
        Msg: null,
        obj: {}
    },
    mutations: {
        setAddres(state, data) {
            state.obj = data
        },
        setMsg(state, data) {
            state.Msg = data
        },
        setData(state, data) {
            data.forEach((item) => {
                item.num = (Math.random() * 100 + 1).toFixed()
                if (item.ethMainnetAddress) {
                    item.chainType = 'ETH'
                    item.coinType = 'USDT'
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
            state.dataList = data
        }
    },
    actions: {
        async GetUserId({ commit }, data) {
            const res = await homeApi.getUserId(data)
            commit('setAddres', res.data.data)
        },
        async GoAutoRegister({ commit }, data) {
            const res = await registerApi.IsRegister(data)
            commit('setMsg', res.data.msg)
        },
        async FindLowerUser({ commit }, data) {
            const res = await homeApi.FindLowerUser()
            commit('setData', res.data.data)
        }
    }
}