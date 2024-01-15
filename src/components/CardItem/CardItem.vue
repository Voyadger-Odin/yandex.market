<template>
  <div class="card">
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
              <div class="flex justify-end items-center gap-1 w-[100%] h-auto absolute top-[88%] right-[10%] opacity-[100%]">
                <div
                    v-for="(image, imageId) in imagesShow"
                    :style="'width: ' + (imageId === imageSelectedId ? 7 : 4) + 'px; height: ' + (imageId === imageSelectedId ? 7 : 4) + 'px'"
                    class="border border-[#000] rounded-[100%] bg-[#eee] transition flex items-center justify-center"
                >
                  <div v-if="imageId === imageSelectedId" class="bg-black w-[3px] h-[3px] m-1px rounded-[100%]" />
                </div>
              </div>
            </div>

            <!-- Promotion -->
            <div
                v-if="item.promotion"
                class="w-[100%] h-[100%] absolute bottom-0 left-0 pointer-events-none"
            >
              <div class="flex justify-start gap-1 w-[100%] h-auto absolute top-[78%] p-2 opacity-[100%]">
                <div class="flex bg-green-700 px-[8px] py-[2px] text-[11px] text-white font-medium rounded-2xl">-{{getPromotion(item.price, item.price_promotion)}}%</div>
              </div>
            </div>
            <!-- End Promotion -->

            <!-- Favorite -->
            <div
                class=" absolute top-5 right-5"
            >
              <HeartIcon
                  @click.prevent="setFavorite()"
                  :is-favorite="userStore.favorites.includes(item.id)"
                  class="cursor-pointer hover:text-black transition"
                  :size="20"
              />
            </div>
            <!-- End Favorite -->
          </div>
        </RouterLink>

      </div>
    </div>

    <div class="p-[10px]">
      <p class="title">{{item.title}}</p>

      <!-- Price -->
      <div>
        <span :class="`price ${item.promotion ? 'price-promotion' : ''}`">
          <Price :price="item.promotion ? item.price_promotion : item.price" />
        </span>
        <span v-if="item.promotion" class="old-price"><Price :price="item.price" /></span>
      </div>
      <!-- End Price -->
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import Price from "@/uikit/Price.vue";
import {getPromotion} from '@/utils/helpers/promotion.js'
import HeartIcon from "@/icons/HeartIcon.vue";
import {useUserStore} from '@/utils/stores/UserStore.js';

export default {
  components: {HeartIcon, Price},

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
      imageSelectedId: null,
      photos: [],
      userStore: null,
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

    setFavorite(){
      this.userStore.setFavorite(this.item.id)
    },
  },
}
</script>

<style scoped>
.card-img-box-square{
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  background: #f8f7f5;
  border-radius: 15px;
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
  color: #21201f;
  font-style: normal;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
}


.price{
  font-weight: 700;
  color: black;
}

.price-promotion{
  color: #0d6b07;
}

.old-price{
  text-decoration: line-through;
  font-size: 13px;
  color: #777;
  margin-left: 10px;
}
</style>