<template>
  <div>
    <h1>User {{$route.params.id}} Page</h1>

    <br><br>

    <h2>Secret data: {{(secret_data) ? secret_data : 'loading'}}</h2>

  </div>
</template>

<script>
import API, {SERVER_URL} from "@/api.js";

export default {
  data() {
    return {
      secret_data: null,
    }
  },

  mounted() {
    API.post(`${SERVER_URL}/api/auth/secret`, {})
        .then(res => {
          console.log(res.data)
          this.secret_data = res.data.secret_data
        })
  },

  methods: {
    Logout() {
      API.post(`${SERVER_URL}/api/auth/logout`)
          .then(res => {
            console.log(res.data)
          })
      localStorage.removeItem('access_token')
      //this.$router.push({name: 'home'})
    },
  }
}
</script>

<style lang="scss" scoped>

</style>