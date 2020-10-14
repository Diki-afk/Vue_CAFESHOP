<template>
    <div>
        <v-container class="ma-0 pa-0" grid-list-sm>
            <v-subheader>All Category</v-subheader>
            <v-layout wrap>
                <!--menampilkan category makanan-->
                <v-flex v-for="(category) in categories" :key="`category-`+category.id" xs6>
                    <v-card :to="'/category/'+ category.slug" class="ma-2 pa-2">
                        <v-img 
                        :src="category.image"
                        class="white--text"
                        height="13em"
                        >
                            <v-card-title class="fill-height align-end"
                            v-text="category.name"
                            >
                            </v-card-title>
                        </v-img>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <template>
            <div class="text-center">
                <v-pagination 
                    v-model="page"
                    @input="go"
                    :length="lengthPage"
                    :total-visible="4"
                    ><!--menampilkan category makanan maksimal sebanyak 4 data/record per halaman-->
                </v-pagination>
            </div>
        </template>
    </div>
</template>

<script>
export default {
  data: () => ({
    categories:[],//menampung array categories yang diperolah dari ajax
    page: 0,//menampung banyaknya data perhalaman
    lengthPage: 0
  }),
  created(){
      this.go()//membuat function go()
    },
    methods: {
        go(){
            let baseUrl = '/categories?page='+this.page//deklarasi variable url
            this.axios.get(baseUrl)//ajax menggunakan axios
            //promise
            .then((response)=>{//success
                    let {data} = response.data
                    let {meta} = response.data
                    this.categories = data
                    this.page = meta.current_page
                    this.lengthPage = meta.last_page
            })
        .catch((error)=>{//error
            let {response} = error
            console.log(response)
      })
        }
    }
}
</script>
