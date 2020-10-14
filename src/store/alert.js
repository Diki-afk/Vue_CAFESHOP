export default {
    namespaced: true,//agar tidak terpengaruh oleh module lain
    state: { //digunakan untuk memanipulasi 3 variable dibawah agar sesuai kondisi
        status: false,
        color: 'success',
        text: ''
    },
    mutations:{
        set: (state, payload) => {
            state.status = payload.status,
            state.color = payload.color,
            state.text = payload.text
        },
    },
    actions: {
        set: ({commit}, payload) => {
            commit('set', payload)
        },
    },
    getters: {
        status : state => state.status,
        color  : state => state.color,
        text   : state => state.text
    }
}