<template>
  <br><br><br><br>
  <div class="form">
    <div>
      <h1>Login Page</h1>
      <br><br>
      <div v-if="error">
        <p class="error" >{{error}}</p>
        <br>
      </div>

      <input v-model="email" type="text" name="email" placeholder="login">
      <br><br>
      <input v-model="password" type="password" name="password" placeholder="password">
      <br><br>
      <button @click.prevent="login">Login</button>
      <br><br>
      <RouterLink to="/registration">Registration</RouterLink>
    </div>
  </div>
</template>

<script>


import axios from "axios";
import API, {SERVER_URL} from "@/api.js";
import {accessToken} from "@/stores/auth.js";
import {useUserStore} from '@/stores/UserStore'

export default {
  data() {
    return {
      email: null,
      password: null,
      error: null,
      userStore: null,
    }
  },

  mounted() {
    this.userStore = useUserStore()
  },

  methods: {
    login() {
      axios.post(`${SERVER_URL}/api/auth/login`, {email: this.email, password: this.password})
          .then(res => {


            localStorage.setItem('access_token', res.data.access_token)
            accessToken.value = res.data.access_token

            API.post(`${SERVER_URL}/api/auth/me`)
                .then(res => {
                  this.userStore.user = res.data
                  console.log(this.userStore.user)
                })

            this.$router.push({name: 'profile'})
          })
          .catch(error => {
            this.error = error.response.data.error
          })
    }
  }
}
</script>

<style scoped>
.form{
  display: flex;
  justify-content: center;
}

.error{
  color: red;
}
</style>