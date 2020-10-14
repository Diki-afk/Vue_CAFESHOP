<template>
    <v-card>
        <v-app-bar app color="teal" dark>
            <v-btn icon dark @click.native="close"><!--menutup tab pencarian menggunakan function close-->
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-text-field 
                hide-details
                append-icon = "mdi-microphone"
                flat
                label="Search"
                prepend-inner-icon = "mdi-magnify"
                solo-inverted
                color="success"
                v-model="keyword"
                @input="doSearch"
            ><!--menggunakan function doSearch-->
            </v-text-field> 

        </v-app-bar>
            <v-card-text v-if="keyword.length>0"><!--jika keyword yang dicari ada maka-->
                <v-subheader><!--tampilkan hasil pencarian-->
                    Result search "{{keyword}}"<!--mencari berdasarkan keyword-->
                </v-subheader>
                <v-alert :value="menu.length==0 && keyword.length>0"
                color="warning"><!--jika tidak maka tampilkan warning-->
                    Sorry, yang kamu cari tidak ada
                </v-alert>

                <v-container class="ma-0 pa-0" grid-list-sm>
                    <v-layout wrap>
                        <!--menampilkan hasil pencarian menggunakan component MenuItem-->
                        <v-flex v-for="(list) in menu" :key="`list-`+list.id" xs6>
                           <menu-item :list="list" /> 
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'search',
    components: {
        MenuItem: () => import(
            '@/components/MenuItem.vue'
        )},//mengimport component MenuItem
    data: () => {
        return{
            keyword: '',//vaiable keyword
            menu: []//menampung array data dari pencarian menu
        }
    },
    methods: {
        doSearch(){
            let keyword = this.keyword//vairable keyword
            if(keyword.length>0){//jika keyword lebih dari 0 dan keyword sesuai
                this.axios.get('/list/search/'+keyword)//ajax data pencarian dari laravel api
                //promise
                .then((response)=>{//success
                    let {data} = response.data
                    this.menu = data
                })
                .catch((error)=>{//error
                    console.log(error)
                })
            }else{//jika tidak ada maka kosong
                this.menu = []
            }
        },
            close(){
               this.$emit('closed', false)//function close yang digunakan untuk menutup component search saat akan titutup dengan menekan button diatas
        }
    },
}

</script>