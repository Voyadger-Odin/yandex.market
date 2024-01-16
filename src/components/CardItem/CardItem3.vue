<template>
  <div class="flex flex-col item p-5">
    <div class="card-img-box-square">
      <div class="card-img-box">

        <RouterLink :to="{name: 'item_detail', params: {id: item.id}}">
          <div class="card-img">
            <img
                @mousemove="hoverImg($event)"
                @mouseout="hoverEndImg"
                class="img" :src="(imageSelectedId !== null) ? imagesShow[imageSelectedId] : imagesShow[0]"
                ref="img_obj"
            >

            <div v-if="imageSelectedId !== null" class="w-[100%] h-[100%] absolute bottom-0 left-0 pointer-events-none">
              <div class="flex justify-center items-center gap-1 w-[100%] h-auto absolute top-[88%] p-2 opacity-[100%]">
                <div
                    v-for="(image, imageId) in imagesShow"
                    :class="`flex-1 ${imageId === imageSelectedId ? 'bg-gray-500' : 'bg-gray-300'} transition flex items-center justify-center h-[2px] rounded-[4px]`"
                />
              </div>
            </div>

            <!-- Promotion -->
            <div
                v-if="item.promotion"
                class="w-[100%] h-[100%] absolute bottom-0 left-0 pointer-events-none"
            >
              <div class="flex justify-start gap-1 w-[100%] h-auto absolute top-[78%] p-2 opacity-[100%]">
                <div class="flex bg-red-500 px-[10px] py-[3px] text-[13px] text-white font-medium rounded-2xl">-{{getPromotion(item.price, item.price_promotion)}}%</div>
              </div>
            </div>
            <!-- End Promotion -->
          </div>

          <!-- Favorite -->
          <div
              class=" absolute top-5 right-5"
          >
            <HeartIcon
                @click.prevent="setFavorite()"
                :is-favorite="userStore.favorites.includes(item.id)"
                class="cursor-pointer hover:text-black transition"
                :size="25"
            />
          </div>
          <!-- End Favorite -->
        </RouterLink>

      </div>
    </div>

    <div class="flex flex-col gap-4 p-[10px]">
      <!-- Price -->
      <div>
        <span class="font-medium text-[23px]">
          <Price :price="item.promotion ? item.price_promotion : item.price" />
        </span>
        <span v-if="item.promotion" class="ml-[10px] text-gray-500 line-through text-[15px]">{{item.price}}</span>
      </div>
      <!-- End Price -->

      <!-- Title -->
      <RouterLink :to="{name: 'item_detail', params: {id: item.id}}">
        <TextLink class="title line-clamp-3 text-blue-600">{{item.title}}</TextLink>
      </RouterLink>
      <!-- End Title -->

      <!-- Rating -->
      <div class="flex items-center gap-1 text-[13px]">
        <Rating :rating="item.rating" :size="12"/>
        <span class="text-slate-500 text-[11px]">({{item.rating_count}})</span>
      </div>
      <!-- End Rating -->
    </div>


    <div class="flex-1"></div>

    <ButtonLarge
        v-if="!this.userStore.basket[this.item?.id]"
        @click="addItemToBasket"
        class="p-[8px] rounded-[5px] text-[15px]"
    >
      В корзину
    </ButtonLarge>
    <CounterItemsInBasket
        v-else
        :count="userStore?.basket[this.item.id]?.count"
        :add="addItemCountInBasket"
        :remove="removeItemCountInBasket"
        :item-id="item.id"
        class="rounded"
    />
  </div>
</template>

<script>
import ButtonLarge from "@/uikit/ButtonLarge.vue";
import Rating from "@/uikit/rating/Rating.vue";
import TextLink from "@/uikit/TextLink.vue";
import {ref} from "vue";
import Price from "@/uikit/Price.vue";
import {getPromotion} from '@/utils/helpers/promotion.js'
import CounterItemsInBasket from "@/uikit/Counters/CounterItemsInBasket.vue";
import API, {SERVER_URL} from "@/utils/api.js";
import {useUserStore} from '@/utils/stores/UserStore.js';
import HeartIcon from "@/icons/HeartIcon.vue";

export default {
  components: {HeartIcon, CounterItemsInBasket, Price, TextLink, Rating, ButtonLarge},

  props: {
    item: Object,
  },

  setup() {
    const img_obj = ref(null)
    return {
      img_obj,
    }
  },

  data() {
    return {
      userStore: null,
      imageSelectedId: null,
      photos: [],
    }
  },

  computed: {
    imagesShow() {
      const maxCountPhotos = 5
      return this.photos.slice(0, maxCountPhotos);
    }
  },

  beforeMount() {
    this.userStore = useUserStore()
    this.photos = JSON.parse(this.item.characteristics).photos
  },

  methods: {
    hoverImg(event) {
      const n = event.offsetX / this.img_obj.offsetWidth
      const length = this.imagesShow.length
      let result = length
      for(let i=length; i > 0; i--){
        if (n <= i / length){
          result--
        }
      }
      this.imageSelectedId = result
    },

    hoverEndImg(){
      this.imageSelectedId = null
    },

    getPromotion(...params){
      return getPromotion(...params)
    },

    addItemToBasket(){
      API.post(`${SERVER_URL}/api/auth/basket/${this.item?.id}`)
          .then(res => {
            this.userStore.basket[this.item?.id] = {
              item_id: this.item?.id,
              count: 1,
            }
          })
    },

    addItemCountInBasket(){
      API.post(`${SERVER_URL}/api/auth/basket/${this.item.id}/${this.userStore.basket[this.item.id].count + 1}`)
          .then(res => {
            this.userStore.basket[this.item?.id].count = res.data.count
          })
    },

    removeItemCountInBasket(){
      API.post(`${SERVER_URL}/api/auth/basket/${this.item.id}/${this.userStore.basket[this.item.id].count - 1}`)
          .then(res => {
            this.userStore.basket[this.item?.id].count = res.data.count

            if (res.data.count === 0){
              this.userStore.removeItemFromBasket(this.item?.id)
            }
          })
    },

    setFavorite(){
      this.userStore.setFavorite(this.item.id)
    },
  }
}
</script>

<style scoped>

.item{
  box-shadow: inset -1px 0 0 0 #e8e8e8, inset 0 -1px 0 0 #e8e8e8, -1px -1px 0 0 #e8e8e8, -1px 0 0 0 #e8e8e8, 0 -1px 0 0 #e8e8e8;
}

.card{
  display: block;
}

.card-img-box-square{
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  background: #f8f7f5;
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