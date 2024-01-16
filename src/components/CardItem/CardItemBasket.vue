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
        <HeartIcon
            @click.prevent="setFavorite()"
            :is-favorite="userStore.favorites.includes(item.id)"
            class="cursor-pointer hover:text-black transition"
            :size="20"
        />
        <DeleteIcon
            @click="removeItemFromBasket(item.id)"
            class="cursor-pointer hover:text-black transition"
            :size="20"
        />
      </div>
    </div>




    <div class="flex flex-col w-[20%]">
      <!-- Price -->
      <div class="flex justify-end items-end">
        <span class="font-medium text-[25px]"><Price :price="item.promotion ? item.price_promotion : item.price" currency="" /><span class="text-[15px]">₽</span></span>
        <span v-if="item.promotion" class="ml-[10px] text-gray-500 line-through text-[15px]"><Price :price="item.price" /></span>
      </div>
      <!-- End Price -->

      <div class="flex-1" />

      <CounterItemsInBasket
          :count="userStore?.basket[item.id]?.count"
          :add="addItemCount"
          :remove="removeItemCount"
          :item-id="item.id"
          class="rounded-xl"
      />
    </div>
  </div>
</template>

<script>
import TextLink from "@/uikit/TextLink.vue";
import {ref} from "vue";
import DeleteIcon from "@/icons/DeleteIcon.vue";
import HeartIcon from "@/icons/HeartIcon.vue";
import Price from "@/uikit/Price.vue";
import CounterItemsInBasket from "@/uikit/Counters/CounterItemsInBasket.vue";
import {useUserStore} from '@/utils/stores/UserStore.js';

export default {
  components: {CounterItemsInBasket, Price, HeartIcon, DeleteIcon, TextLink},

  props: {
    item: Object,
    add: Function,
    remove: Function,
    removeItemFromBasket: Function,
  },

  setup() {
    const img_obj = ref(null)
    return {
      img_obj,
    }
  },

  data() {
    return {
      photos: [],
      userStore: null,
    }
  },

  beforeMount() {
    this.userStore = useUserStore()
    this.photos = JSON.parse(this.item.characteristics).photos
  },

  methods: {
    addItemCount(id){
      this.add(id)
    },

    removeItemCount(id){
      this.remove(id)
    },

    setFavorite(){
      this.userStore.setFavorite(this.item.id)
    },
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