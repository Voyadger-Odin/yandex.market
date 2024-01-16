<template>
  <div class="bg-black">
    <!-- Header -->
    <div class="flex items-center py-10 px-[10%] text-white">
      <h1 class="font-medium text-[35px]">{{vendor?.name}}</h1>

      <div class="flex-1" />

      <!-- Buttons List -->
      <div class="flex gap-5">
        <!-- Delivery Button -->
        <div
            v-if="userStore.user"
            class="flex items-center gap-3 bg-[#222] hover:bg-[#333] transition px-[15px] py-[8px] rounded-2xl cursor-pointer"
        >
          <GeoFillIcon :size="23" />
          <div class="flex flex-col">
            <span class="text-[13px]">{{userStore.user.address ? userStore.user.address : 'Адрес не выбран'}}</span>
            <span class="text-[13px] text-gray-400 flex gap-1">Адрес доставки</span>
          </div>
        </div>
        <!-- End Delivery Button -->

        <!-- Info Button -->
        <div
            @click="openModal"
            class="flex items-center gap-3 bg-[#222] hover:bg-[#333] transition px-[15px] py-[8px] rounded-2xl cursor-pointer"
        >
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
            <CardItem3
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

  <!-- Modal -->
  <Modal
      :is-open="isOpenModal"
      :close-function="closeModal"
  >
    <div class="flex flex-col gap-6 w-[350px]">
      <div class="flex flex-col gap-2">
        <h1 class="text-[25px] font-medium">Рейтинг</h1>

        <div class="flex flex-col gap-2 text-gray-700">
          <div class="flex">
            <span>Оценка</span>
            <div class="flex-1" />
            <div class="flex items-center gap-1 font-bold">
              <StarFillIcon class="text-[#fc0]" />
              <RatingNumber :rating="vendor?.grade" />
            </div>
          </div>
          <hr>
          <div class="flex">
            <span>Всего оценок</span>
            <div class="flex-1" />
            <span>{{vendor?.grades}}</span>
          </div>
          <hr>
          <div class="flex">
            <span>Всего отзывов</span>
            <div class="flex-1" />
            <span>{{vendor?.reviews}}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <h1 class="text-[25px] font-medium">О магазине</h1>
        <span>{{getVendorName()}}</span>
        <span v-if="vendor?.address">Адрес: {{vendor.address}}</span>
        <span>ОГРН: {{vendor?.number}}</span>
      </div>

      <ButtonLarge
          @click="closeModal"
      >
        Понятно
      </ButtonLarge>
    </div>
  </Modal>
  <!-- End Modal -->
</template>

<script>
import CardItem3 from "@/components/CardItem/CardItem3.vue";
import InfoFillIcon from "@/icons/InfoFillIcon.vue";
import StarFillIcon from "@/icons/StarFillIcon.vue";
import GeoFillIcon from "@/icons/GeoFillIcon.vue";
import {usePageStore} from "@/utils/stores/PageStore.js";
import axios from "axios";
import {SERVER_URL} from "@/utils/api.js";
import RatingNumber from "@/uikit/RatingNumber.vue";
import Modal from "@/uikit/Modal.vue";
import ButtonLarge from "@/uikit/ButtonLarge.vue";
import {useUserStore} from '@/utils/stores/UserStore';

export default {
  components: {ButtonLarge, Modal, RatingNumber, GeoFillIcon, StarFillIcon, InfoFillIcon, CardItem3},

  data(){
    return {
      userStore: null,
      vendor: null,
      items: null,

      // Modal
      isOpenModal: false,
    }
  },

  beforeMount() {
    this.pageStore = usePageStore()
    this.userStore = useUserStore()

    axios.get(`${SERVER_URL}/api/shop/${this.$route.params.id}`)
        .then(res => {
          this.vendor = res.data.vendor
          this.items = res.data.items

          console.log(res.data.vendor)
        })
  },

  mounted() {
    document.addEventListener('keydown', this.closeModalEscapeKeydown)
  },

  unmounted() {
    document.removeEventListener('keydown', this.closeModalEscapeKeydown)
  },

  methods: {
    closeModalEscapeKeydown(event){
      if(event.code === 'Escape'){
        this.closeModal()
      }
    },

    getVendorName(){
      let name = ''
      if (this.vendor?.type === 'IP'){name += 'ИП'}
      if (this.vendor?.type === 'OOO'){name += 'ООО'}
      if (this.vendor?.type === 'AO'){name += 'АО'}

      name = `${name} «${this.vendor?.vendor}»`
      return name
    },


    openModal(){
      this.isOpenModal = true
    },

    closeModal(){
      this.isOpenModal = false
    },
  },
}
</script>

<style lang="scss" scoped>

</style>