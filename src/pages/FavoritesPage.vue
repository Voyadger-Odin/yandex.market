<template>
  <div class="w-[100%] flex justify-center">
    <div class="h-[100%] w-[70%] flex flex-col gap-10">
      <h1 class="font-medium text-[45px]">Избранное</h1>
      <div class="grid grid-cols-4">
        <CardIetm3
            v-for="item in favorites"
            :key="item.id"
            :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardIetm3 from "@/components/CardIetm3.vue";
import API, {SERVER_URL} from "@/api.js";
import {accessToken} from "@/stores/auth.js";

export default {
  components: {CardIetm3},

  data(){
    return {
      favorites: [],
    }
  },

  beforeMount() {
    API.get(`${SERVER_URL}/api/auth/favorites`)
        .then(res => {
          console.log('favorites', res.data)
          this.favorites = res.data
        })
  },
}
</script>

<style scoped>

</style>