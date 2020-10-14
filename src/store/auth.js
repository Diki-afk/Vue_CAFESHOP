export default{
    namespaced: true,
    state: {
        user : {},//state user bertipe objek yang berisi data user
    },
    mutations: {
        set: (state, payload) => {
            state.user = payload
        },
    },
    actions: {
        set: ({commit}, payload) => {
            commit('set', payload)//digunakan untuk mengeset data user yang sudah login pada state user
        },
    },
    getters: {
        user: state => state.user,//digunakan untuk mengecek apakah user sudah login atau belum
        guest : state => Object.keys(state.user).length === 0,
    }
}