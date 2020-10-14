<template>
    <div>
        <v-container class="ma-0 pa-0" grid-list-sm>
            <v-subheader>All Menu</v-subheader>
            <v-layout wrap>
                <v-flex v-for="(list) in menu" :key="`list-`+list.id" xs6>
                        <menu-item :list="list" /><!--penggunaan componen MenuItem yang sudah diimport-->
                </v-flex>
            </v-layout>
        </v-container>

        <template>
        <!--menampilkan list Menu maximal sebanyak 4 data/record perhalaman-->
            <div class="text-center">
                <v-pagination 
                    v-model="page"
                    @input="go"
                    :length="lengthPage"
                    :total-visible="4"
                    >
                </v-pagination>
            </div>
        </template>
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
        menu: [],//untuk menampung data/record Menu yang diambil dari api menggunakan axios dibawah
        page: 0,//untuk menampung paginate dari ajax
        lengthPage: 0
    }),
    created(){
        this.go()
    },
    methods: {
        go(){
            //mengambil data dari http://tugasakhir.test/v1/list?page=jumlahdata 
            let BaseUrl = '/list?page='+this.page//supdaya lebih rapi dan dinamis saya buat variable
            this.axios.get(BaseUrl)
            //promise
            .then((response)=>{//success
                let {data} = response.data
                let {meta} = response.data//data meta dapat dilihat pada json response pada laravel
                this.menu = data
                this.lengthPage = meta.last_page//panjang page yang sudah diatur pada laravel tepatnya pada controller
                this.page = meta.current_page
            })
            .catch((error)=>{//error
                let {response} = error
                console.log(response)
            })
        }
    }
};
</script>