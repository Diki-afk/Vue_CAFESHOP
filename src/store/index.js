import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import cart from '@/store/cart'//import module cart
import alert from '@/store/alert'//import module alert 
import dialog from '@/store/dialog'//import module dialog
import auth from '@/store/auth'//import module auth
const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: localStorage
})
Vue.use(Vuex)



export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {//dklarasi module yang sudah diimport agar bisa digunakan
    cart,
    alert,
    dialog,
    auth
  }
})
