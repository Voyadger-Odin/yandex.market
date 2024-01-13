<template>
  <div class="flex">
    <div class="card-img-box-square">
      <div class="card-img-box">

        <RouterLink :to="{name: 'item_detail', params: {id: item.id}}">
          <div class="card-img">
            <img
                class="img" :src="photos[0]"
                ref="img_obj"
            >
          </div>
        </RouterLink>

      </div>
    </div>

    <div class="flex flex-1 flex-col gap-2 p-[10px]">
      <!-- Title -->
      <RouterLink :to="`/${item.id}`">
        <TextLink>
          <span class="title line-clamp-3">{{item.full_title}}</span>
        </TextLink>
      </RouterLink>
      <!-- End Title -->

      <!-- Shop -->
      <RouterLink :to="`/shop/${item.shop_id}`">
        <span class="text-gray-500 text-[13px]">{{item.shop_name}}</span>
      </RouterLink>
      <!-- End Shop -->

      <div class="flex-1" />

      <div class="flex gap-3 text-gray-500 items-center">
        <HeartIcon class="cursor-pointer hover:text-black transition" :size="20" />
        <DeleteIcon class="cursor-pointer hover:text-black transition" :size="20" />
      </div>
    </div>




    <div class="flex flex-col w-[15%]">
      <!-- Price -->
      <div class="flex justify-end items-end">
        <span class="font-medium text-[25px]"><Price :price="item.promotion ? item.price_promotion : item.price" currency="" /><span class="text-[15px]">₽</span></span>
        <span v-if="item.promotion" class="ml-[10px] text-gray-500 line-through text-[15px]"><Price :price="item.price" /></span>
      </div>
      <!-- End Price -->

      <div class="flex-1" />

      <div class="flex bg-gray-100 rounded-2xl overflow-hidden">
        <!-- Less -->
        <button class="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
          </svg>
        </button>
        <!-- End Less -->

        <!-- Count -->
        <div class="flex justify-center flex-1 text-center items-center font-medium">
          {{item.count}}
        </div>
        <!-- End Count -->

        <!-- More -->
        <button class="flex justify-center items-center w-[40px] h-[40px] hover:bg-gray-200 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
          </svg>
        </button>
        <!-- End More -->
      </div>
    </div>
  </div>
</template>

<script>
import ButtonLarge from "@/uikit/ButtonLarge.vue";
import Raiting from "@/uikit/Raiting.vue";
import TextLink from "@/uikit/TextLink.vue";
import {ref} from "vue";
import DeleteIcon from "@/icons/DeleteIcon.vue";
import HeartIcon from "@/icons/HeartIcon.vue";
import Price from "@/uikit/Price.vue";

export default {
  components: {Price, HeartIcon, DeleteIcon, TextLink, Raiting, ButtonLarge},

  setup() {
    const img_obj = ref(null)
    return {
      img_obj,
    }
  },

  data() {
    return {
      photos: [],
    }
  },

  props: {
    item: Object,
  },

  beforeMount() {
    this.photos = JSON.parse(this.item.characteristics).photos
  },
}
</script>

<style scoped>

.card-img-box-square{
  position: relative;
  width: 10%;
  height: 0;
  padding-bottom: 10%;
  overflow: hidden;
  background: #f8f7f5;
  border-radius: 10px;
}

.card-img-box{
  position: absolute;
  height: calc(100% + 15px);
  width: 100%;
  padding-bottom: 15px;
}

.card-img{
  width: 100%;
  height: 100%;
}

.img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.title{
  font-style: normal;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
}

</style>