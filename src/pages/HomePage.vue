<template>
  <div class="flex justify-center mt-[50px]">
    <div class="grid grid-cols-6 gap-[15px] w-[1450px]">
      <!-- Card -->
      <CardItem
          v-for="item in this.items"
          :key="item.id"
          :item="item"
      />
      <!-- End Card -->
    </div>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import CardItem from "@/components/CardItem.vue";
import {SERVER_URL} from "@/api.js";
import axios from "axios";

export default defineComponent({
  components: {CardItem},

  data(){
    return {
      items: [],
    }
  },

  mounted() {
    axios.get(`${SERVER_URL}/api/recommendations`)
        .then(res => {
          if (!this.items){this.items = []}
          this.items = [...this.items, ...res.data]
        })
  }
})
</script>

<style scoped>

</style>