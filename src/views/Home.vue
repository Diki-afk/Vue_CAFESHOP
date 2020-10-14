<template>
  <div>
      <!--template katagori-->
      <v-container class="ma-0 pa-0" grid-list-sm>
        <div class="text-right">
        <!--mengarahkan ke view categories-->
          <v-btn small text to="/categories" class="teal--text">
              All Categories <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>      

        <v-layout wrap>
            <!--menampilkan category menggunakan ajax dari axios
            random-->
            <v-flex v-for="(category) in categories" :key="`category-`+category.id" xs6>
            <v-card class="pa-2 ma-2" :to="'/category/'+ category.slug"><!--mengarahkan ke view category-->
              <v-img
                :src="category.image"
                class="white--text"
                height="13em"
                aspect-ratio="2"
              >
              <v-card-title
                class="fill-height align-end"
                v-text="category.name"
              >
              </v-card-title>
              </v-img>
            </v-card>
            </v-flex>  
        </v-layout>
      </v-container>

      <!--template Menu-->
      <v-container class="ma-0 pa-0 mt-2" grid-list-sm>
        <div class="text-right">
        <!--mengarahkan ke view menu -->
          <v-btn small text to="/menu" class="teal--text">
              All Menu <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>      

        <v-layout wrap>
            <v-flex v-for="(list) in menu" :key="`list-`+list.id" xs6>
              <menu-item :list="list" /><!--mengarahkan ke view list-->
              <!--penggunaan komponent MenuItem yang manampilkan list menu-->
            </v-flex>  
        </v-layout>
      </v-container>
  </div>
</template>

<script>
export default {
  components: {
    MenuItem: () => import(
      '@/components/MenuItem.vue'//deklarasi/import component MenuItem
    )
  },
  data: () => ({
    categories:[],//untuk menampung data/record categories yang diambil dari api menggunakan axios dibawah
    menu:[]//untuk menampung data/record Menu yang diambil dari api menggunakan axios dibawah
  }),
  created(){
      //disini saya tidak perlu menuliskan lengkap domain karena saya sudah menuliskannya pada konfigurasi axios yang terletak pada direktori .plugin/axios.js
      //karena lebih fleksible
      //mengambil data dari http://tugasakhir.test/v1/categories/random yang manmpilkan 2 data atau record
      this.axios.get('/categories/random/2')
      //promise
      .then((response)=>{
        let {data} = response.data//success
        this.categories = data
      })
      .catch((error)=>{
        let {response} = error//error
        console.log(response)
      }),
      //mengambil data dari http://tugasakhir.test/v1/list/top yang manmpilkan 4 data atau record
      this.axios.get('/list/top/4')
      //promise 
      .then((response)=>{
        let {data} = response.data//success
        this.menu = data
      })
      .catch((error)=>{
          let{response} = error//error
          console.log(response)
      })
    },
}
</script>
