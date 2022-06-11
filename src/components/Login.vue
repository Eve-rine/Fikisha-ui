<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="indigo">
                <v-toolbar-title>FIKISHA LIMITED</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form  v-model="isValid" ref="loginForm">
                  <v-text-field
                      prepend-icon="person"
                      label="Email"
                      v-model="formData.email"
                      :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                      prepend-icon="lock"
                      label="Password"
                      type="password"
                      v-model="formData.password"
                      :rules="[rules.required]"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="white--text" color="indigo" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LoginPage',
  data: ()=>({
    formData: {
      email:'',
      password: ''
    },
    isValid: true,
    rules: {
        required: (value) => !!value || 'Required.'
  }
  }),
  methods:{
    login() {    
      if (!this.isValid) {
        this.$refs.loginForm.validate()
      } else {
      this.$store.dispatch('login', { ...this.formData})
      }
    },
  }

};
</script>

<style></style>
