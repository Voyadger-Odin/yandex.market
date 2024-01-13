<template>
  <br><br><br><br>
  <div class="form">
    <div>
      <h1>Registration Page</h1>
      <br><br>
      <input v-model="email" type="text" name="email" placeholder="login">
      <br><br>
      <input v-model="password" type="password" name="password" placeholder="password">
      <br><br>
      <button @click.prevent="login">Login</button>
      <br><br>
      <RouterLink to="/login">Login</RouterLink>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },

  mounted() {

  },

  methods: {
    login() {
      axios.post('http://localhost:8000/login', {email: this.email, password: this.password})
          .then(res => {
            console.log(res.data)
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
</style>