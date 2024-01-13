<template>
  <div class="w-[100%] flex justify-center">
    <div class="h-[100%] w-[70%] flex flex-col gap-10">
      <div class="flex items-end gap-5">
        <h1 class="font-medium text-[30px]">Корзина</h1>
        <span class="text-[15px] text-gray-500 pb-[5px]">1 товар</span>
      </div>
      <div class="flex flex-col gap-5">
        <div
            v-for="item in this.items"
            :key="item.id"
            class="flex flex-col gap-5"
        >
          <hr>
          <div class="flex gap-5 items-start">
            <input type="checkbox">
            <CardItemBasket
                class="flex-1"
                :item="item"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardIetm3 from "@/components/CardIetm3.vue";
import CardItemBasket from "@/components/CardItemBasket.vue";
import API, {SERVER_URL} from "@/api.js";

export default {
  components: {CardItemBasket},

  data(){
    return {
      items: [],
    }
  },

  beforeMount() {
    API.get(`${SERVER_URL}/api/auth/basket`)
        .then(res => {
          console.log('basket', res.data)
          this.items = res.data
        })
  },
}
</script>

<style scoped>

</style>