<template>
    <div>
    <v-flex xs12>
        <!--mengarahkan ke route category-->
        <v-card :to="'/category/'+ category.slug" v-if="category.slug" class="pa-3 ma-2">
        
            <v-layout wrap>
            <v-img
            :src="category.image"
            class="white--text "
            height="30vh"
            >
            <v-card-title
            class="fill-height align-center"
            v-text="category.name"
            >
            </v-card-title>
            </v-img>
             </v-layout>
        </v-card>
        </v-flex>
        <!--menampilkan menu berdasarkan category-->
        <v-container class="ma-0 pa-o" grid-list-sm v-if="menu">
            <v-subheader>All Menu</v-subheader>
            <v-layout wrap>
                <v-flex v-for="(list) in menu" :key="`list-`+list.id" xs6>
                    <menu-item :list="list" />
                </v-flex>
            </v-layout>
        </v-container>
        <v-pagination 
        :length="lengthPage" 
        v-model="page"
        @input="go"
        :total-visible="6"
        ><!--berjumlah 6 data/record perhalaman-->
        </v-pagination>
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
        category: {},//menampung data objek category
        menu: [],//menampung data array daftar Menu
        page: 0,//untuk menampung paginate dari ajax
        lengthPage: 0
    }),
    created(){
        this.go()//create function go()
    },
    methods: {
        //method dari function go()
        go(){
            let {slug} = this.$route.params
            let baseUrl = '/categories/slug/'+slug
            baseUrl = baseUrl + '?page='+this.page
            baseUrl = encodeURI(baseUrl)
            this.axios.get(baseUrl)
            //promise
            .then((response) => {
                let {data} = response.data
                let category = data
                this.category = category
                this.menu = category.menus.data
                this.page = category.menus.current_page
                this.lengthPage = category.menus.last_page
            })
            .catch((error) => {
                let {response} = error
                console.log(response)
            })
        }
    }
};
</script>