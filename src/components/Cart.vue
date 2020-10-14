<template>
    <v-card>
        <v-toolbar color="teal" dark>
            <v-btn icon dark @click.native="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>
                Your Order Cart!
            </v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>

        <v-container fluid>
            <div v-if="countCart===0"><!--jika tidak ada menu yang ditambahkan pada cart maka-->
                <v-alert outlined color="warning" icon="mdi-cart-off">
                    belum ada memesan
                </v-alert>
            </div>
            <!--jika ada menu yang ditambahkan maka tampilkan menu tersebut-->
            <v-list three-line v-if="countCart>0"><!-- getters countCart-->
                <template v-for="(item, index) in carts"><!-- getters carts-->
                    <v-list-item :key="'cart'+index">
                    <v-list-item-avatar>
                        <v-img :src="item.cover"></v-img>
                    </v-list-item-avatar>
                    
                    <v-list-item-content>
                        <v-list-item-title v-html="item.title"></v-list-item-title>

                        <v-list-item-subtitle>
                            Rp. {{ item.price.toLocaleString('id-ID')}}
                            <!--function toLocalString agar angka price sesuai dengan negara indonesia-->
                            <span style="float:right">
                            <v-btn icon small rounded depressed @click.stop="removeCart(item)">
                            <!--digunakan untuk mengurangi kuantitas jumlah pesanan-->
                            <!--menggunakan action remove dari store cart-->
                                <v-icon color="red">mdi-minus-circle</v-icon>
                            </v-btn>
                            {{item.quantity}}<!--jumlah kuantitas pesanan-->
                            <v-btn icon small rounded depressed @click.stop="addCart(item)">
                            <!--digunakan untuk menambah kuantitas jumlah pesanan-->
                            <!--menggunakan action add dari store cart-->
                                <v-icon color="green">mdi-plus-circle</v-icon>
                            </v-btn>
                            </span>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>

            <v-card>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex pa-1 xs6>
                            Total Harga ({{sumQuantity}} items)<br>
                            <span class="title">Rp. {{sumPrice.toLocaleString('id-ID')}}</span>
                            <!--jumlah keseluruhan harga barang yang didapatkan dari getters sumPrice -->
                        </v-flex>
                        <v-flex pa-1 xs6 text-right>
                            <v-btn color="success" @click="checkout" :disabled="sumQuantity==0">
                            <!--jumlah keseluruhan kuatitas barang yang didapatkan dari getters sumQuantity -->
                                <v-icon>mdi-cart-arrow-right</v-icon>&nbsp;
                                Checkout
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-container>
    </v-card>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'//digunakan untuk memanggil action dan getters pada vuex yang digunakan untuk mapping action dan mapping getters
export default {
    name: 'cart',//nama component
    computed: {
        ...mapGetters({
            carts: 'cart/carts',//mapping getters carts yang ada pada store cart
            countCart : 'cart/count',//mapping getters count yang ada pada store cart
            sumPrice : 'cart/sumPrice',//mapping getters sumPrice yang ada pada store cart
            sumQuantity : 'cart/sumQuantity',//mapping getters sumQuantity yang ada pada store cart
        }),
    },
    methods: {
        ...mapActions({
            setAlert : 'alert/set',//mapping action set yang ada pada store alert
            addCart : 'cart/add',//mapping action add yang ada pada store cart
            removeCart : 'cart/remove',//mapping action remove yang ada pada store cart
            setCart : 'cart/set',//mapping action set yang ada pada store cart
        }),
        checkout(){
            this.close()
            this.$router.push({path: "checkout"})
        },
        close() {
            this.$emit('closed', false)
        }
    },
}
</script>