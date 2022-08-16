import getAngentmanageApi from '../apis/angentmanageApi'
export default {
    namespaced: true,
    state: {
        data: null,
        deleteBeliel: null
    },
    mutations: {
        setData(state, data) {
            state.data = data
        },
        setDeleteBeliel(state, data) {
            state.deleteBeliel = data
        }
    },
    actions: {
        async GetAngentmanage({ commit }, data) {
            const res = await getAngentmanageApi.GetAngentmanages(data)
            //剔除用户(后端暂时无人, 临时数据格式化)
            var info = res.data.data
            var infoList = []
            for (var i = 0; i < info.length; i++) {
                if (info[i].userType != -1) {
                    infoList.push(info[i])
                }
            }
            commit('setData', infoList)
        },
        async DeleteBeliel({ commit }, data) {
            const res = await getAngentmanageApi.updateBeliel(data);
            commit('setDeleteBeliel', res.data)
        },
        async DeleteAddress({ commit }, data) {
            const res = await getAngentmanageApi.updateAddress(data);
        },
        async FreezeAccount({ commit }, data) {
            // console.log(data,"1111")
            const res = await getAngentmanageApi.freezeAccount(data);
            // console.log(res)
        },
    }
}