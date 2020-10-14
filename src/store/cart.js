export default {
    namespaced: true,
    state: {
      carts: [],
    },
    mutations: {
      insert: (state, payload)=>{
        //menambah sebuah menu kedalam cart ketika user memesan sebuah menu
        state.carts.push({
          id: payload.id,
          title: payload.title,
          cover: payload.cover,
          price: payload.price,
          quantity: 1
        })
      },
      update:(state, payload) => {
        //mendeteksi payload ada diindex ke berapa
        let index = state.carts.indexOf(payload);
        //user mengubah banyaknya pesanan
        state.carts.splice(index,1,{
          id: payload.id,
          title: payload.title,
          cover: payload.cover,
          price: payload.price,
          quantity: payload.quantity
        });
        if (payload.quantity<=0) {
          //menghapus item cart jika kuantitasnya 0
          state.carts.splice(index, 1)
        }
      },
      //kumpulan cart yang sudah diupdate ditambah
      set: (state, payload) => {
          state.carts = payload
      },
    },
    actions: {
      add: ({state, commit}, payload) => {
        //mendeteksi apakah data yang diinput ada pada carts
        let cartItem = state.carts.find(item => item.id === payload.id)
        //jika tidak maka mutation insert akan dijalankan
        if (!cartItem) {
          commit('insert', payload)
        }
        else{//jika ada mutation update akan dijalankan 
          cartItem.quantity++
          commit('update', cartItem)
        }
      },
      //menghapus cart pada item tertentu
      remove: ({state, commit}, payload) => {
          let cartItem = state.carts.find(item => item.id === payload.id)
          if(cartItem){
              cartItem.quantity--
              commit('update', cartItem)
          }
      },
      //kumpulan cart yang sudah diupdate dikurangi
      set: ({commit}, payload) => {
          commit('set', payload)
      },
    },
    modules: {
    },
    getters: {
      carts : state=>state.carts,
      count : (state) => {
          return state.carts.length//mengembalikan nilai jumlah carts
      },
      //menghitung total harga
      sumPrice : (state) => {
          let sum = 0
          state.carts.forEach(function(cart) {
              sum += cart.price * cart.quantity
          })
          return sum
      },
      //semua jumlah barang
      sumQuantity: (state) => {
          let sum = 0
          state.carts.forEach(function(cart){
              sum += cart.quantity
          })
          return sum
      },
    }
  }
  