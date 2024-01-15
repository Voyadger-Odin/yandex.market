<template>
  <div>
    <h1>User {{$route.params.id}} Page</h1>

    <br><br>

    <h2>Secret data: {{(secret_data) ? secret_data : 'loading'}}</h2>

  </div>
</template>

<script>
import API, {SERVER_URL} from "@/utils/api.js";
import {useUserStore} from '@/utils/stores/UserStore'

export default {
  data() {
    return {
      userStore: null,
      secret_data: null,
    }
  },

  beforeMount() {
    this.userStore = useUserStore()
  },

  mounted() {
    API.post(`${SERVER_URL}/api/auth/secret`, {})
        .then(res => {
          console.log(res.data)
          this.secret_data = res.data.secret_data
        })
  },
}
</script>

<style lang="scss" scoped>

</style>