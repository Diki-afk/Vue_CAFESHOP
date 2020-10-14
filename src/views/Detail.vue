<template>
    <div>
        <v-card v-if="list.slug"><!--ketika suatu menu sudah ditekan 
        maka akan mengambil nilai slugnya dan diarahkan ke view detail-->
            <v-img :src="list.cover"
            class="white--text"
            height="350px"
            >
            <v-card-title 
            class="fill-height align-end"
            v-text="list.title"
            >
            </v-card-title>
            </v-img>

            <v-card-text>
                <v-simple-table dense>
                    <tbody>
                        <tr>
                            <td><v-icon>mdi-eye</v-icon> Views</td>
                            <td class="black--text">{{list.views}}</td>
                        </tr>
                        <tr>
                            <td><v-icon>mdi-cash</v-icon> Price</td>
                            <td class="teal--text">Rp{{list.price.toLocaleString('id-ID')}}</td>
                            <!--function toLocalString agar format yang ditampilkan adalah format angka indonesia-->
                        </tr>
                    </tbody>
                </v-simple-table>
                Description: <br>
                {{list.description}}
                <br><!--menambilkan category menu yang sudah direkasi many to many pada laravel-->
                Categories:
                <v-chip v-for="category in list.categories.data" 
                :key="category.id" 
                :to="'/category/'+category.slug"
                 small>{{category.name}}</v-chip>
            </v-card-text>
            <v-card-actions>
                <v-btn block color="success" @click="buy" dark>
                    <v-icon>mdi-cart-plus</v-icon> &nbsp;
                    BUY
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import {mapActions} from 'vuex' //digunakan untuk memanggil action pada vuex yang digunankan untuk mapping action
export default {
    data: () => ({
        list: {}//menampung objek list
    }),
    created(){
        this.go()//membuat function go()
    },
    methods:{
        ...mapActions({//deklarasi action yang dipangil dan dispact layaknya properti method this.add(data_menu)
            addCart: 'cart/add', //deklarasi action yang dipangil
            setAlert : 'alert/set'
        }),
        buy() {
            this.addCart(this.list)
            this.setAlert({
                status: true,
                color: 'success',
                text: 'added to cart'
            })
        },
        go(){//deklarasi function go()
            let {slug} = this.$route.params//pengecekan route berdasaran nilai slug
            let baseUrl = '/list/slug/'+slug
            baseUrl = baseUrl + '?page'+this.page
            baseUrl = encodeURI(baseUrl)
            this.axios.get(baseUrl)
             .then((response) => {
                 let {data} = response.data
                 this.list = data
             }).catch((error) => {
                 let {response} = error
                 console.log(response)
             });
        },
    }
};
</script>