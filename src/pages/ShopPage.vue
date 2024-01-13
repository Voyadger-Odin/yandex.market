<template>
  <div class="bg-black">
    <!-- Header -->
    <div class="flex items-center py-10 px-[10%] text-white">
      <h1 class="font-medium text-[35px]">{{vendor?.name}}</h1>

      <div class="flex-1" />

      <!-- Buttons List -->
      <div class="flex gap-5">
        <!-- Delivery Button -->
        <div class="flex items-center gap-3 bg-[#222] hover:bg-[#333] transition px-[15px] py-[8px] rounded-2xl cursor-pointer">
          <GeoFillIcon :size="23" />
          <div class="flex flex-col">
            <span class="text-[13px]">Красная пл.</span>
            <span class="text-[13px] text-gray-400 flex gap-1">Адрес доставки</span>
          </div>
        </div>
        <!-- End Delivery Button -->

        <!-- Info Button -->
        <div class="flex items-center gap-3 bg-[#222] hover:bg-[#333] transition px-[15px] py-[8px] rounded-2xl cursor-pointer">
          <InfoFillIcon :size="23" />
          <div class="flex flex-col">
            <span class="text-[13px]">О магазине</span>
            <span class="text-[13px] text-gray-400 flex gap-1"><StarFillIcon :size="13"/> <RatingNumber :rating="vendor?.grade" /></span>
          </div>
        </div>
        <!-- End Info Button -->
      </div>
      <!-- End Buttons List -->
    </div>
    <!-- End Header -->

    <!-- Body -->
    <div class="bg-white p-[20px]" style="border-radius: 40px 40px 0 0">
      <div class="w-[100%] flex justify-center">
        <div class="h-[100%] w-[70%] flex flex-col gap-5">
          <h1 class="font-medium text-[35px]">Товары</h1>
          <div class="grid grid-cols-4">
            <CardIetm3
                v-for="item in items"
                :key="items.id"
                :item="item"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- End Body -->
  </div>
</template>

<script>
import CardIetm3 from "@/components/CardIetm3.vue";
import InfoFillIcon from "@/icons/InfoFillIcon.vue";
import StarFillIcon from "@/icons/StarFillIcon.vue";
import GeoFillIcon from "@/icons/GeoFillIcon.vue";
import {usePageStore} from "@/stores/PageStore.js";
import axios from "axios";
import {SERVER_URL} from "@/api.js";
import RatingNumber from "@/uikit/RatingNumber.vue";

export default {
  components: {RatingNumber, GeoFillIcon, StarFillIcon, InfoFillIcon, CardIetm3},

  data(){
    return {
      vendor: null,
      items: null,
    }
  },

  beforeMount() {
    this.pageStore = usePageStore()

    axios.get(`${SERVER_URL}/api/shop/${this.$route.params.id}`)
        .then(res => {
          this.vendor = res.data.vendor
          this.items = res.data.items
        })
  },
}
</script>

<style lang="scss" scoped>

</style>