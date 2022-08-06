import homeApi from "@/apis/homeApi";
import registerApi from '../apis/registerApi'
export default {
    namespaced: true,
    state: {
        data: null,
        Msg: null,
        obj: {}
    },
    mutations: {
        setAddres(state, data) {
            console.log(data);
            state.obj = data
        },
        setMsg(state, data) {
            state.Msg = data
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
    }
}