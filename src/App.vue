<template>
    <v-app>
      <!--pengondisian apakah sekarang ada pada route home apa tidak mneggunakan function home()-->
      <v-app-bar
        app
        color="teal"
        dark
        v-if="Home"
      ><!-- Header jika view home-->
       

        <v-app-bar-nav-icon @click.stop="drawer = !drawer"><!-- navigasi didalam view home--></v-app-bar-nav-icon>
        <v-toolbar-title>CafeShop</v-toolbar-title>
          
        <v-spacer></v-spacer>
        <!--componen search didalam view home-->
        <v-text-field 
            hide-details
            append-icon = "mdi-microphone"
            flat
            label="Search"
            prepend-inner-icon = "mdi-magnify"
            solo-inverted
            color="success"
            @click="setDialogComponent('search')"
        ><!--component search yang akan ditampilkan dengan event onclik dengan action setDialogComponent-->
        </v-text-field>       
        <!--componen cart didalam view home-->       
        <v-btn icon @click="setDialogComponent('cart')"><!--component cart yang akan ditampilkan dengan event onclik dengan action setDialogComponent-->
            <v-badge color="orange" overlap>
              <template v-slot:badge v-if="countCart>0">
                <span>{{ countCart }} </span>
              </template>
              <v-icon>mdi-cart</v-icon>
            </v-badge>
        </v-btn>

      </v-app-bar>

      <v-app-bar
        app
        color="teal"
        dark
        v-else
      >
        <!--navigasi diluar view home-->
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
       <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
       </v-btn>

      <v-spacer></v-spacer> 
      <!--componen search diluar view home-->
      <v-text-field 
            hide-details
            append-icon = "mdi-microphone"
            flat
            label="Search"
            prepend-inner-icon = "mdi-magnify"
            solo-inverted
            color="success"
            @click="setDialogComponent('search')"
        ><!--component search yang akan ditampilkan dengan event onclik dengan action setDialogComponent-->
        </v-text-field>  
        <!--componen cart diluar view home-->
        <v-btn icon @click="setDialogComponent('cart')"><!--component cart yang akan ditampilkan dengan event onclik dengan action setDialogComponent-->
            <v-badge color="orange" overlap>
              <template v-slot:badge v-if="countCart>0">
                <span>{{ countCart }} </span>
              </template>
              <v-icon>mdi-cart</v-icon>
            </v-badge>
        </v-btn>

      </v-app-bar>
      <alert /><!--penggunaan component alert-->
      <v-card>
          <!-- isi dari navigasi atau sidebar -->
          <v-navigation-drawer app v-model="drawer" color="light">
            <v-list>
            <!--jika user belum login maka berstatus guest-->
              <div class="pa-2" v-if="guest">
                  <!--component login yang akan ditampilkan dengan event onclik dengan action setDialogComponent-->
                  <v-btn block color="#427ef5" mb-1 class="ma-1" @click="setDialogComponent('login')">
                    <v-icon left>mdi-lock</v-icon>
                    <!--component login pada sidebar-->
                    Login
                  </v-btn>
                  <!--component register yang akan ditampilkan dengan event onclik dengan action setDialogComponent-->
                  <v-btn block color="success" mb-1 class="ma-1" @click="setDialogComponent('register')">
                    <v-icon left>mdi-account</v-icon>
                    <!--component register pada sidebar-->
                    Register
                  </v-btn>
              </div>

              <v-divider></v-divider>
              <!--jika user sudah login-->
              <v-list-item v-if="!guest"> 
                <v-list-item-avatar>
                  <v-img :src="'http://tugasakhir.test/storage/'+user.avatar" contain></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="subheading">{{user.name}}</v-list-item-title>
                </v-list-item-content>              
                </v-list-item>

              <v-list shaped>
                <template v-for="(item, index) in navigation">
                  <v-list-item
                    :key="`menu-`+index"
                    :to="item.route"
                    v-if="!item.auth || (item.auth && !guest)"
                  >
              
                    <v-list-item-icon>
                        <v-icon left>{{item.icon}}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{item.title}}</v-list-item-title>
                    </v-list-item-content>
                
                  </v-list-item>
                </template>
              </v-list>
              
            </v-list>

            <template v-slot:append v-if="!guest">
                <div class="pa-2">
                  <v-btn block color="danger" dark @click="logout">
                    <v-icon left>mdi-lock</v-icon>
                    <!--component logout pada sidebar-->
                    logout
                  </v-btn>
                </div>
              </template>
          </v-navigation-drawer>
        </v-card>

          <!--menggunakan dynamic component-->
        <keep-alive>
          <!--agar component sebelumnya dicache maka dibungkus dengan keep-alive-->
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <component :is="currentComponent" @closed="setDialogStatus"><!--melakukan binding tehadap variable nama component ayng bisa diubah secara dinamis-->
          <!--ketika event onclosed maka action setDialogStatus akan didapatkan nilainya-->
          </component>
          </v-dialog>
      </keep-alive>

      <v-content>
      <!-- body -->
        <v-container fluid>
          <v-slide-x-transition>
            <!-- menampilkan hasil dari vue router -->
            <router-view><!--untuk menampilkan konten utama--></router-view>
          </v-slide-x-transition>
        </v-container>
      </v-content>

      <v-card>
        <v-footer>
        <!-- footer -->
            <v-card-text class="text-center">
              Diki Taufik Gurohman &copy; {{ new Date() .getFullYear() }} - <strong>CaffeShop</strong> powered by <strong>Vuetivy</strong>
            </v-card-text>
        </v-footer>
      </v-card>

  </v-app>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';//digunakan untuk memanggil action dan getters pada vuex yang digunakan untuk mapping action dan mapping getters
export default {
  name: 'App',
  components: {
    Search: () => import('@/components/Search.vue'), //komponen search
    Alert: () => import('@/components/Alert.vue'),//komponen alert
    Cart: () => import('@/components/Cart.vue'),//komponen cart
    Login : () => import('@/components/Login.vue'),//komponen login
    Register: () => import('@/components/Register.vue'),//komponen register
  },
  data: () => ({
    drawer: false,
    navigation: [// dari navigasi atau side menu
      {title: 'Home', icon: 'mdi-home', route: '/'},//route home
      {title: 'about', icon: 'mdi-help-box', route: '/about'},//route about
      {title: 'Profile', icon: 'mdi-account', route: '/profile', auth: true},//route profile akan muncul jika sudah login=true
    ],
  
  }),
  computed: {
    Home() {
      return (this.$route.path==='/')//mengecek route apakah sudah pada ke home
    },
    ...mapGetters({
      countCart : 'cart/count',//mapping getters count yang ada pada store cart, digunakan untuk update nilai notifikasi pesanan pada cart
      guest : 'auth/guest',//mapping getters guest yang ada pada store auth
      user : 'auth/user',//mapping getters user yang ada pada store auth
      dialogStatus : 'dialog/status',//mapping getters status yang ada pada store dialog
      currentComponent: 'dialog/component',//mapping getters component yang ada pada store dialog
      
    }),
    dialog: {
      get() {
        return this.dialogStatus//mendapatkan nilai dialogStatus
      },
      set(value){
        this.setDialogStatus(value)//mengeset nilai yang didapat dari action setDialogstatus
      }
    }
  },
  methods: {
    ...mapActions({
      setDialogStatus : 'dialog/setStatus',//mapping action setStatus yang ada pada store dialog 
      setDialogComponent : 'dialog/setComponent',//mapping action setComponent yang ada pada stre dialog
      setAuth : 'auth/set',//mapping action set yang ada pada store auth
      setAlert: 'alert/set',//mapping action set yang ada pada store alert
    }),
    logout(){//function logout
      let config = {
        headers: {//autorisasi untuk logout adalah dengan bearer token yang didapat saat user login dan digenerate token pada laravel
        'Authorization': 'Bearer ' + this.user.api_token, 
      },
    }
    this.axios.post('/logout', {}, config)//ajax dari api laravel http/tugasakhir.test/v1/logout
      //promise
      .then(() => {//success
        this.setAuth({})//kosongkan auth ketika sudah logout
        this.setAlert({//tampilkan alert success
          status : true,
          color : 'success',
          text : 'Logout successfully'
        })
      })
      .catch((error) =>{//error
        let {data} = error.response
        this.setAlert({//tampilkan alert error
          status: true,
          color : 'error',
          text : data.message
        })
      })
    }
  },
}
</script>
