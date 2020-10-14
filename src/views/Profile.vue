<template>
    <div>
        <v-app>
            <v-subheader>Your Profile</v-subheader>
            <v-card flat><!--menampilkan profile user yang sudah login
            yang diperoleh dari getters user-->
            <v-img :src="'http://tugasakhir.test/storage/'+user.avatar"
                                    height="10em" width="10em" contain
                                ></v-img>
                <v-container>
                    <v-simple-table>
                        <tbody>
                            <tr>
                                <td>
                                    name
                                </td>
                                <td>{{user.name}}</td>
                            </tr>
                            <tr>
                                <td>
                                    email
                                </td>
                                <td>{{user.email}}</td>
                            </tr>
                            <tr>
                                <td>
                                    phone
                                </td>
                                <td>{{user.phone}}</td>
                            </tr>
                            <tr >
                                <td>
                                    Role
                                </td>
                                <td>{{user.roles}}</td>
                            </tr>
                            <tr >
                                <td>
                                    update
                                </td>
                                <td>{{user.updated_at}}</td>
                            </tr>
                            <tr>
                                <td>
                                    Create
                                </td>
                                <td>{{user.created_at}}</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-container>
            </v-card>
         </v-app>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters({
            'user': 'auth/user',//mapping getters user yang ada pada store auth
        }),        
    }

}
</script>