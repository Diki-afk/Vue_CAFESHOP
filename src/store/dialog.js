export default {
    namespaced: true,
    state: {
        status : false,
        component : 'search'//boleh komponent lainnya digunakan untuk menyimpan nilai component
    },
    mutations: {
        setStatus: (state, status) => {
            state.status = status
        },
        setComponent: (state, component) => {
            state.component = component
        },
    },
    actions: {
        //mengeset status pada dialog
        setStatus: ({commit}, status) => {
            commit('setStatus', status)
        },//dan mengeset component yang akan ditampilakn pada dialog
        setComponent: ({commit}, component)=> {
            commit('setComponent', component)
            commit('setStatus', true)
        },
    },
    getters: {
        status : state => state.status,
        component: state => state.component,
    }
}