<template>
  <v-sheet height="100%" class="neu-glow-inset">
    <v-container class="fill-height justify-center" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="7">
          <v-sheet class="neu-glow with-radius">
            <v-card-text class="pa-0">
              <v-row class="ma-0">
                <v-col
                  cols="12"
                  md="6"
                  class="pa-0"
                  v-if="$vuetify.breakpoint.mdAndUp"
                >
                  <!-- <slider /> -->
                  <v-row
                    align="center"
                    justify="center"
                    class="fill-height ma-0"
                  >
                    <v-img
                      src="/static/illustator/working_late.png"
                      lazy-src="/static/illustator/working_late.png"
                    ></v-img>
                  </v-row>
                </v-col>
                <!-- 2 -->
                <v-col cols="12" md="6">
                  <div class="my-8 text-center">
                    <div class="text-h4 d-flex justify-center align-center">
                      <vuse-logo class="primary--text" size="45" /><b>use</b>
                      <span class="ml-2">Admin</span>
                    </div>
                    <div class="subtitle-1 mt-3">Hello, Welcome Back!</div>
                  </div>
                  <v-sheet max-width="380" class="mx-auto" color="transparent">
                    <v-form
                      @submit.prevent="$v.$invalid ? null : submit()"
                      ref="form"
                    >
                      <v-text-field
                        :error-messages="fieldErrors('form.email')"
                        @input="$v.form.email.$touch()"
                        @blur="$v.form.email.$touch()"
                        prepend-inner-icon="email"
                        v-model="form.email"
                        label="Email"
                        solo
                        flat
                      />
                      <v-text-field
                        :error-messages="fieldErrors('form.password')"
                        :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPwd ? 'text' : 'password'"
                        @input="$v.form.password.$touch()"
                        @blur="$v.form.password.$touch()"
                        prepend-inner-icon="vpn_key"
                        v-model="form.password"
                        label="Password"
                        @click:append="showPwd = !showPwd"
                        solo
                        flat
                      />
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <!-- <v-checkbox
                          v-model="form.rememberMe"
                          label="Remember Me"
                          class="mt-0"
                        ></v-checkbox> -->
                        <router-link
                          to="/authentication/forgot-password"
                          class="py-1 no-text-decoration"
                          >Forgot Password
                        </router-link>
                      </div>
                      <v-btn block type="submit" :disabled="$v.$invalid"
                        >Sign In</v-btn
                      >
                      <div class="text-center my-5">
                        Don't have account ?
                        <router-link
                          to="/authentication/signup"
                          class="py-1 no-text-decoration"
                          >Create Account</router-link
                        >
                      </div>
                    </v-form>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card-text>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" absolute top right color="success">
      <span>Signed In Successfully</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
    <v-snackbar v-model="snackbarFail" absolute top right color="danger">
      <span>The username and password don't match</span>
      <v-icon dark>close</v-icon>
    </v-snackbar>
  </v-sheet>
</template>

<script>
// Validations
import { required, email, minLength } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'
// import User from '../../../../models/user'

const defaultForm = {
  email: '',
  password: ''
  // rememberMe: false,
}
export default {
  mixins: [validationMixin],
  validations: {
    form: {
      email: { required, email },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  validationMessages: {
    form: {
      email: {
        required: 'Please enter email',
        email: 'Email must be valid'
      },
      password: {
        required: 'Please enter password',
        minLength: 'Password must be of 6 characters'
      }
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      showPwd: false,
      snackbar: false,
      snackbarFail: false
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/home')
    }
  },
  methods: {
    submit() {
      // this.snackbar = true;

      // setTimeout(() => {
      //   this.$router.push({
      //     name: "dashboard/operational",
      //   });
      // }, 2000);

      this.$store.dispatch('auth/login', this.form).then(
        () => {
          this.snackbar = true
          this.resetForm()
          this.$router.push('/home')
          this.$v.$reset()
        },
        (error) => {
          this.snackbar = false
          this.snackbarFail = true
          this.resetForm()
          this.$v.$reset()
          console.log('There was error: ' + error)
        }
      )
    },
    resetForm() {
      this.form = Object.assign({}, defaultForm)
      this.$refs.form.reset()
    }
  }
}
</script>
