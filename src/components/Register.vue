<template>
    <v-card>
        <v-toolbar color="teal">
            <v-btn icon dark @click.native="close"><!--untuk close component ketika diklik close-->
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>

        <v-container fluid><!--form data untuk Register-->
            <v-form ref="form" v-model="valid" lazy-validation><!--jika validasi terpenuhi makan aka valid bernilai true-->
            <!--kode valid akan memonitor perubahan nilai yang diinput oleh user jika ada perubahan nilai maka akan dilakukan validasi -->
            <v-text-field
                   v-model="name"
                   :counter="200"
                   label="Name"
                   :rules="nameRules"
                   required
                   append-icon="mdi-account"
               ></v-text-field>
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

                <v-text-field
                    v-model="phone"
                    name="phone"
                    :counter="14"
                    :rules="phoneRules"
                    label="Number Phone"
                    required
                    append-icon="mdi-phone"
                    ></v-text-field>

                    <v-file-input
                    v-model="avatar"
                    :rules="avatarRules"
                    accept="image/png, image/jpeg, image/jpg, image/svg"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    label="Avatar"
                    >
                    </v-file-input>
               <v-checkbox 
               label="Do you agree with our privacy policy ?" 
               v-model="checkbox" 
               :rules="[v => !!v || 'You must agree to continue']" 
               required>
               </v-checkbox>
               <div class="text-xs-center">
                    <v-btn color="accent lighten-1"
                        :disabled="!valid"
                        @click="submit"
                    ><!--ketika button submit diklik maka akan menjalankan function submit()-->
                <!--jika tidak terpenuhi validasinya maka valid akan bernilai false-->
                        Register
                        <v-icon>mdi-account-plus</v-icon>
                    </v-btn>
                    <v-btn @click="clear">
                        Reset
                        <v-icon>mdi-lock-reset</v-icon>
                </v-btn>
               </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'//digunakan untuk memanggil action dan getters pada vuex yang digunakan untuk mapping action dan mapping getters
export default {
    name: 'register',//name component
    data() {
        return {//validasi untuk formData register
            valid: true,//jika validasi terpenuhi valid akan bernilai true
            name: '',
            nameRules: [//rules validasi nama
                v => !!v || 'Name is Required',
                v => (v && v.length <= 200) || 'Name must be less than 255 character'
            ],
            email: 'email@example.com',//label
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
           phone: '',
           phoneRules: [//rules validasi phone
               v => !!v || 'Phone required.',
               v =>  (v && v.length >= 12,[0-9])|| 'phone number invalid'
           ],
            avatar: '',
            avatarRules:[//rule validasi file input avatar
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
           checkbox : false//pertama kali checkbox akan bernilai false apabila sudah tercentang akan bernilai true
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
            setAuth  : 'auth/set',//mapping action set yang ada pada store auth
        }),
        submit() {//jika validasi berhasil maka akan dapat mengeklik button register yang bernilai function submit
            //ketika validasi sudah valid dan tombol register sudah diklik 
            if (this.$refs.form.validate()) {
                let formData = new FormData()
                formData.set('name', this.name)
                formData.set('email', this.email)
                formData.set('password', this.password)
                formData.set('phone', this.phone)
                formData.set('avatar', this.avatar)
                this.axios.post('/register', formData)//axios akan mengirim formData register ke server laravel
                    //promise
                    .then((response) => {//success
                        let {data} = response.data
                        this.setAuth(data)//jika berhasil yang diterima adalah data user yang disimpan pada state user
                        this.setAlert({//dan alert akan muncul dengan pesan success
                            status: true,
                            color: 'success',
                            text: 'Register success',
                        })
                        this.close()//lalu component register akan menutup
                    })
                    .catch((error) => {//erorr
                        let {data} = error.response.data
                        this.setAlert({
                            status: true,
                            color: 'error',
                            text: data.message,
                        })
                    })
            }
        },
        close() {
            this.$emit('closed', false)//function untuk menutup component register
        },
        clear() {
            this.$refs.form.reset()//function untuk mereset isi dari formData yagn telah diisi oleh user
        }
    },
}
</script>