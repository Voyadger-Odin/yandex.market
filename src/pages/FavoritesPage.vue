<template>
  <div class="w-[100%] mt-[20px] flex justify-center">
    <div class="h-[100%] w-[70%] flex flex-col gap-10">
      <h1 class="font-medium text-[45px]">Избранное</h1>
      <div
          v-if="favorites?.length === 0"
          class="flex items-center justify-center h-[50vh]"
      >
        <span class="text-gray-500 text-[20px]">Нет понравившихся товаров 😔</span>
      </div>
      <div class="grid grid-cols-4">
        <CardItem3
            v-for="item in favorites"
            :key="item.id"
            :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardItem3 from "@/components/CardItem/CardItem3.vue";
import API, {SERVER_URL} from "@/utils/api.js";

export default {
  components: {CardItem3},

  data(){
    return {
      favorites: null,
    }
  },

  beforeMount() {
    API.get(`${SERVER_URL}/api/auth/favorites`)
        .then(res => {
          this.favorites = res.data
        })
  },
}
</script>

<style scoped>

</style>