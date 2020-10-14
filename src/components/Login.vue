<template>
    <v-card>
       <v-toolbar dark color="teal">
           <v-btn icon dark @click.native="close"><!--untuk close component ketika diklik close-->
                <v-icon>mdi-close</v-icon>
           </v-btn>
           <v-toolbar-title>
               Login and start order Menu
           </v-toolbar-title>
       </v-toolbar> 
       <v-divider></v-divider>

       <v-container fluid><!--form data untuk login-->
           <v-form ref="form" v-model="valid" lazy-validation><!--jika validasi terpenuhi makan aka valid bernilai true-->
               <!--kode valid akan memonitor perubahan nilai yang diinput oleh user jika ada perubahan nilai maka akan dilakukan validasi -->
               <v-text-field
                   v-model="email"
                   label="E-mail"
                   :rules="emailRules"
                   required
                   append-icon="mdi-email"
               ></v-text-field>
               <v-text-field
                   v-model="password"
                   :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                   :rules="passwordRules"
                   label="Password"
                   :type="showPassword ? 'text' : 'password'"
                   hint = "at least 6 characters"
                   counter
                   @click:append="showPassword = !showPassword"
               ></v-text-field>

               <div class="text-xs-center">
                <v-btn color="accent lighten-1"
                    :disabled="!valid"
                    @click="submit"
                ><!--ketika button submit diklik maka akan menjalankan function submit()-->
                <!--jika tidak terpenuhi validasinya maka valid akan bernilai false-->
                Login
                <v-icon>mdi-lock-open</v-icon>
                </v-btn>
               </div>
           </v-form>
       </v-container>
    </v-card>
</template>

<script>
 import {mapGetters, mapActions} from 'vuex'//digunakan untuk memanggil action dan getters pada vuex yang digunakan untuk mapping action dan mapping getters
export default {
   name: 'login',//nama component
   data () {
       return{//validasi untuk login
           valid: true,//jika terpenuhi valid akan bernilai true
           email: 'email@example.org',//label
           emailRules: [//rules validasi email
               v => !!v || 'E-mail is required',
               v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'
            ],
           showPassword: false,//showpassword pertama kali akan bernilai false
           password: '',
           passwordRules: [//rules validasi password
               v => !!v || 'Password required.',
               v => (v && v.length >= 6) || 'Min 6 characters',
           ],
       }
   },
    computed: {
        ...mapGetters({
            user: 'auth/user',//mapping getters user yang ada pada store auth
        }),
    },
    methods: {
        ...mapActions({
            setAlert : 'alert/set',//mapping action set yang ada pada store alert
            setAuth : 'auth/set',//mapping action set yang ada pada store auth
        }),
        //jika validasi berhasil makan akan dapat mengeklik button login yang bernilai function submit
        submit () {
             //ketika validasi sudah valid dan tombol login sudah diklik 
            if (this.$refs.form.validate()) {
                let formData = {
                    'email' : this.email,
                    'password' : this.password
                }//axios akan mengirim formData login ke server laravel
                this.axios.post('/login', formData)
                //promise
                .then((response) => {//success
                    let {data} = response.data
                    this.setAuth(data)//jika berhasil yang diterima adalah data user yang disimpan pada state user
                    if (this.user.id>0) {
                        this.setAlert({
                            status: true,
                            color : 'success',
                            text : 'Login success',
                        })
                        this.close()//lalu component login akan menutup
                    }else{
                        this.setAlert({//jika gagal
                            status: true,
                            color : 'error',
                            text : 'Login failed',
                        })
                    }
                })
                .catch((error)=> {//error
                    let {data} = error.response
                    this.setAlert({
                        status: true,
                        color : 'error',
                        text : data.message,
                    })
                })
            }
        },
        close() {
            this.$emit('closed', false)
        }
    },
}
</script>