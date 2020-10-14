<template>
    <div>
        <v-card :to="'/list/'+list.slug" class="pa-2 ma-2">
            <v-img
            :src="list.cover"
            class="white--text"
            height="200px"
            >
            <v-card-title 
            class="fill-height align-end"
            v-text="list.title"
            >
            </v-card-title>
            </v-img>

            <v-card-actions >
                <v-icon>mdi-cash</v-icon>
                <span class="teal--text">Rp {{list.price.toLocaleString('id-ID')}}</span>
                <v-spacer></v-spacer>
                <v-icon>mdi-eye</v-icon>{{list.views}} 
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    name: 'menu-item',//nama component
    props: ['list'],//component ini menggunakan 
    //data dari list dari componen lain maka dari itu menggunakan props
    //props adalah properti yang digunakan untuk mengirimkan data dari parent ke child component
    data(){
         return {item:this.list} 
    },
    methods:{
        ...mapActions({
            addCart: 'cart/add',//mapping action add yang ada pada store cart
            setAlert : 'alert/set'//mapping action set yang ada pada store alert
        }),
        buy() {
            this.addCart(this.list)//jika button buy ditekan action add akan menambahkan list(mmenu)
            this.setAlert({//action alert akan mengeset alert 
                status: true,
                color: 'success',
                text: 'added to cart'
            })
        },
    }
}
</script>