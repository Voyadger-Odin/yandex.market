<template>
  <div class="w-[100%] flex justify-center mt-[50px]">
    <div class="h-[100%] w-[70%] flex gap-10">
      <!-- Left Section -->
      <div class="flex flex-col gap-10 w-[80%] h-[100%]">
        <!-- Categories -->
        <div class="flex gap-2">
          <div class="flex items-center gap-3 bg-gray-100 px-2 py-1 rounded text-[13px] cursor-pointer">
            <span>{{item?.category_1}}</span>
            <ArrowRightIcon class="pt-1"/>
          </div>
          <div class="flex items-center gap-3 bg-gray-100 px-2 py-1 rounded text-[13px] cursor-pointer">
            <span>{{item?.category_2}}</span>
            <ArrowRightIcon class="pt-1"/>
          </div>
          <div class="flex items-center gap-3 bg-gray-100 px-2 py-1 rounded text-[13px] cursor-pointer">
            <span>{{item?.category_3}}</span>
            <ArrowRightIcon class="pt-1"/>
          </div>
          <div class="flex items-center gap-3 bg-gray-100 px-2 py-1 rounded text-[13px] cursor-pointer">
            <span>{{item?.title}}</span>
            <ArrowRightIcon class="pt-1"/>
          </div>
        </div>
        <!-- End Categories -->

        <!-- Item Preview -->
        <div class="flex gap-5">
          <!-- Item Photos -->
          <div class="w-[60%]">
            <div class="flex gap-3">
              <div class="flex flex-col w-[20%]">
                <div class="flex-1">
                  <div class="flex flex-col h-[100%] gap-4 grid-rows-4">
                    <div
                        v-for="(photo, photoId) in photos.slice(0,4)"
                        :class="`flex
                        justify-center
                        items-center
                        w-[110px]
                        h-[160px]
                        p-[5px]
                        border-[2px]
                        ${(photoId === photoSelectedId) ? 'border-yellow-300' : 'border-[#0000]'}
                        hover:border-yellow-300
                        rounded-2xl
                        overflow-hidden
                        transition
                        cursor-pointer`"
                        @click="selectPhoto(photoId)"
                    >
                      <img
                          :src="photo"
                          class="photo-item"
                      >
                    </div>


                  </div>
                </div>
                <div
                    v-if="photos.length > photos.slice(0, 4).length"
                    class="flex justify-center text-[13px] text-blue-600 w-[100%]"
                >
                  <TextLink
                      @click="openPhotosList"
                      class="mt-1"
                  >
                    ещё {{photos.length - photos.slice(0, 4).length}}
                  </TextLink>
                </div>
              </div>
              <div class="p-1 w-[80%]">
                <ImageLoupe
                    class="cursor-pointer"
                    :image_src="photos[photoSelectedId]"
                />
              </div>
            </div>
          </div>
          <!-- End Item Photos -->

          <!-- Item Info -->
          <div class="w-[40%] flex flex-col gap-4">
            <h1 class="font-medium text-[20px]">{{item?.full_title}}</h1>

            <!-- Rating -->
            <div
                v-if="item"
                class="flex items-center gap-1"
            >
              <span class="font-bold"><RatingNumber :rating="item?.rating" /></span>
              <Rating :rating="item?.rating" :size="15"/>
              <span class="text-slate-500 text-[11px]">({{this.item?.rating_count}})</span>
            </div>
            <!-- End Rating -->

            <!-- About -->
            <div class="flex flex-col gap-2">
              <span class="font-medium">Коротко о товаре</span>
              <ul class="text-[13px] space-y-[10px]">
                <li
                    v-for="(characteristic, key) in characteristics.slice(0, 10)"
                    :key="key"
                >
                  <div class="flex justify-between">
                    <div class="flex w-[100%] h-fit">
                      <span class="text-slate-500 h-fit">{{characteristic.name}}</span>
                      <div class="flex-1 border-b border-dotted border-slate-500 m-0 my-1"/>
                    </div>
                    <div class="text-black text-end">{{characteristic.data}}</div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- End About -->
          </div>
          <!-- End Item Info -->
        </div>
        <!-- End Item Preview -->

        <!-- Other Items Of Vendor -->
        <div v-if="otherItemsOfVendor.length > 0" class="flex flex-col gap-5">
          <h2 class="font-medium text-2xl">Другие товары продавца</h2>
          <CardList :items="otherItemsOfVendor" />
        </div>
        <!-- End Other Items Of Vendor -->

        <!-- About -->
        <div>
          <h2 class="font-medium text-2xl">Описание</h2>

          <LotOfText :line-count="6">{{item?.description}}</LotOfText>
        </div>
        <!-- End About -->

        <!-- Characteristics -->
        <h2 class="font-medium text-2xl">Характеристики</h2>
        <ul class="text-[13px] space-y-[10px]">
          <li
              v-for="(characteristic, key) in characteristics"
              :key="key"
          >
            <div class="flex justify-between">
              <div class="flex w-[100%] h-fit">
                <span class="text-slate-500 h-fit">{{characteristic.name}}</span>
                <div class="flex-1 border-b border-dotted border-slate-500 m-0 my-1"/>
              </div>
              <div class="text-black text-end">{{characteristic.data}}</div>
            </div>
          </li>
        </ul>
        <!-- End Characteristics -->

        <hr>

        <!-- Dop Info -->
        <div class="flex flex-col text-[13px] text-gray-500">
          <span>Перед покупкой уточняйте характеристики и комплектацию у продавца.</span>
          <span>Внешний вид товаров и/или упаковки может быть изменён изготовителем и отличаться от изображенных на Яндекс Маркете.</span>
        </div>
        <!-- End Dop Info -->

        <!-- Reviews -->
        <div class="flex flex-col gap-5">
          <h2 class="font-medium text-2xl">Отзывы</h2>

          <!-- Rating -->
          <div v-if="item" class="flex gap-3 items-center">
            <span class="font-bold text-[60px]"><RatingNumber :rating="item?.rating" /></span>
            <div class="flex flex-col gap-1">
              <Rating :rating="item?.rating" color="black" :size="15" />
              <div class="flex gap-3 items-center text-[15px]">
                <span>{{item?.rating_count}} {{numWord(item?.rating_count ? item?.rating_count : 0, ['оценка', 'оценки', 'оценок'])}}</span>
                <span class="text-gray-300 text-[15px]">•</span>
                <span>{{item?.comments_count}} {{numWord(item?.comments_count ? item?.comments_count : 0, ['отзыв', 'отзыва', 'отзывов'])}}</span>
              </div>
            </div>
          </div>
          <!-- End Rating -->

          <!-- Review -->
          <div v-if="reviews && reviews.length > 0" class="flex flex-col gap-10">
            <Review :review="reviews[0]" />
          </div>
          <!-- End Review -->

          <ButtonLarge class="p-[8px] bg-gray-100 hover:bg-gray-200">Посмотреть все комментарии</ButtonLarge>

        </div>
        <!-- End Reviews -->

        <hr>

        <!-- Dop Info -->
        <div class="flex flex-col text-[11px] text-gray-400">
          <span>Информацию об условиях отпуска (реализации) уточняйте у продавца.</span>
          <span>Информация о технических характеристиках, комплекте поставки, стране изготовления и внешнем виде товара носит справочный характер.
Стоимость доставки из других регионов приблизительная. Точную стоимость уточняйте у продавца.
Товары в разделе «Вместе с этим покупают» подобраны автоматически. Совместимость товаров уточняйте у продавца или производителя.
Ежемесячный платеж является приблизительным или рассчитан автоматически на основе предоставленной продавцом информации. Подробные условия покупки товаров в кредит, полную стоимость кредита и другие условия кредитования уточняйте на сайте продавца.</span>
        </div>
        <!-- End Dop Info -->
      </div>
      <!-- End Left Section -->




      <!-- Right Section -->
      <div class="flex flex-col gap-3 w-[30%] h-[100%]" ref="rightBlock">
        <div class="flex justify-end">
          <!-- Favorite -->
          <div
              @click.prevent="setFavorite()"
              class="flex items-center gap-1 text-gray-600 cursor-pointer hover:text-black transition"
          >
            <HeartIcon
                class="" :size="15"
                :is-favorite="userStore.favorites.includes(item?.id)"
            />
            <span>В избранное</span>
          </div>
          <!-- End Favorite -->
        </div>

        <Card class="flex flex-col gap-5">
          <!-- Price -->
          <div class="flex items-end gap-2">
            <span :class="`text-[25px] ${item?.promotion ? 'text-green-800' : 'text-black'} font-bold`"><Price :price="item?.promotion ? item?.price_promotion : item?.price" /></span>
            <span v-if="item?.promotion" class="text-[16px] text-gray-500 line-through py-1 "><Price :price="item?.price" /></span>
          </div>
          <!-- End Price -->

          <!-- Shop -->
          <div class="flex gap-5">
            <!-- Name -->
            <RouterLink :to="`/shop/${vendor?.id}`">
              <div class="flex gap-1 items-center text-gray-800 hover:text-red-600 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
                </svg>
                <span>{{vendor?.name}}</span>
              </div>
            </RouterLink>
            <!-- End Name -->

            <div class="flex items-center gap-1 text-[14px]">
              <span class="text-orange-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
              </span>
              <span><RatingNumber :rating="vendor?.grade" /><span class="text-gray-500">/{{vendor?.grades}}</span></span>
            </div>
          </div>
          <!-- End Shop -->

          <ButtonLarge
              v-if="!this.userStore.basket[this.item?.id]"
              @click="addItemToBasket"
          >
            Добавить в корзину
          </ButtonLarge>

          <CounterItemsInBasket2
              v-else
              :count="this.userStore?.basket[this.item?.id]?.count"
              :add="addItemCountInBasket"
              :remove="removeItemCountInBasket"
              :item-id="item?.id"
          />
        </Card>
      </div>
      <!-- End Right Section -->

      <!-- Up Menu -->
      <div :class="`fixed top-0 left-0 flex justify-center p-[20px] w-[100%] bg-white shadow-2xl shadow-gray-400 up-menu ${isOpenUpMenu ? 'open' : ''}`">
        <div class="flex items-center w-[70%]">
          <!-- Title -->
          <div class="flex flex-1 items-center gap-5">
            <img class="h-[70px]" :src="photos[0]">
            <div class="flex flex-col">
              <h1 class="font-medium text-[20px]">{{item?.full_title}}</h1>
              <div class="flex items-center gap-5 text-[15px]">
                <div v-if="item" class="flex items-center gap-1">
                  <span :class="`font-bold text-[18px]`"><RatingNumber :rating="item?.rating" /></span>
                  <Rating :rating="item?.rating" :size="13"/>
                  <span class="text-slate-500 text-[9px]">({{item?.rating_count}})</span>
                </div>

                <TextLink>12 вопросов</TextLink>
                <TextLink>Характеристики</TextLink>

                <!-- Favorite -->
                <div
                    @click.prevent="setFavorite()"
                    class="flex items-center gap-1 text-gray-600 cursor-pointer hover:text-black transition"
                >
                  <HeartIcon
                      class="" :size="15"
                      :is-favorite="userStore.favorites.includes(item?.id)"
                  />
                  <span>В избранное</span>
                </div>
                <!-- End Favorite -->
              </div>
            </div>
          </div>
          <!-- End Title -->

          <!-- Price -->
          <div class="flex gap-5 items-center">
            <!-- Price -->
            <div class="flex items-end gap-2">
              <span
                  :class="`text-[25px] ${item?.promotion ? 'text-green-800' : 'text-black'} font-bold`"
              ><Price :price="item?.promotion ? item?.price_promotion : item?.price" /></span>
              <span
                  v-if="item?.promotion"
                  class="text-[16px] text-gray-500 line-through py-1 "
              >
                <Price :price="item?.price" />
              </span>
            </div>
            <!-- End Price -->

            <div class="w-[200px]">
              <ButtonLarge
                  v-if="!this.userStore.basket[this.item?.id]"
                  @click="addItemToBasket"
              >
                Добавить в корзину
              </ButtonLarge>

              <CounterItemsInBasket
                  v-else
                  :count="this.userStore?.basket[this.item?.id]?.count"
                  :add="addItemCountInBasket"
                  :remove="removeItemCountInBasket"
                  :item-id="item?.id"
                  :size="50"
                  class="rounded-2xl"
              />
            </div>


          </div>
          <!-- End Price -->
        </div>
      </div>
      <!-- End Up Menu -->
    </div>
  </div>

  <PhotosView
      :photos="photos"
      :is-open="isOpenPhotosList"
      :close-function="closePhotosList"
      :photos-list-open-callback="photosListOpenCallback"
  />
</template>

<script>

import LotOfText from "@/uikit/LotOfText.vue";
import Card from "@/uikit/Card.vue";
import ButtonLarge from "@/uikit/ButtonLarge.vue";
import ImageLoupe from "@/uikit/ImageLoupe.vue";
import TextLink from "@/uikit/TextLink.vue";
import CardList from "@/components/CardList.vue";
import {ref} from "vue";
import Rating from "@/uikit/rating/Rating.vue";
import Review from "@/components/Review.vue";
import HeartIcon from "@/icons/HeartIcon.vue";
import ArrowRightIcon from "@/icons/ArrowRightIcon.vue";
import API, {SERVER_URL} from "@/utils/api.js";
import axios from "axios";
import PhotosView from "@/uikit/PhotosView.vue";
import {usePageStore} from '@/utils/stores/PageStore.js'
import RatingNumber from "@/uikit/RatingNumber.vue";
import Price from "@/uikit/Price.vue";
import {useUserStore} from '@/utils/stores/UserStore';
import CounterItemsInBasket from "@/uikit/Counters/CounterItemsInBasket.vue";
import CounterItemsInBasket2 from "@/uikit/Counters/CounterItemsInBasket2.vue";
import {numWord} from "@/utils/helpers/words.js";

export default {
  components: {
    CounterItemsInBasket,
    CounterItemsInBasket2,
    Price,
    RatingNumber,
    PhotosView,
    ArrowRightIcon, HeartIcon, Review, Rating, CardList, TextLink, ImageLoupe, ButtonLarge, Card, LotOfText},

  setup() {
    const rightBlock = ref(null)
    return {
      rightBlock,
    }
  },

  data() {
    return {
      item: null,
      vendor: null,
      photos: [],
      characteristics: [],
      photoSelectedId: 0,
      isOpenUpMenu: false,
      pageStore: null,
      userStore: null,

      // PhotosList
      isOpenPhotosList: false,
      photosListOpenCallback: {'callback': null},

      otherItemsOfVendor: [],

      reviews: null
    }
  },

  beforeMount() {
    this.userStore = useUserStore()
    this.pageStore = usePageStore()
    this.getItem()
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  unmounted () {
    window.removeEventListener('scroll', this.handleScroll);
  },

  watch: {
    $route (to, from){
      this.getItem()
      window.scrollTo(0, 0);
    }
  },

  methods: {
    numWord,
    addItemCountInBasket(id){
      API.post(`${SERVER_URL}/api/auth/basket/${id}/${this.userStore.basket[id].count + 1}`)
          .then(res => {
            this.userStore.basket[this.item?.id].count = res.data.count
          })
    },

    removeItemCountInBasket(id){
      API.post(`${SERVER_URL}/api/auth/basket/${id}/${this.userStore.basket[id].count - 1}`)
          .then(res => {
            this.userStore.basket[this.item?.id].count = res.data.count

            if (res.data.count === 0){
              this.userStore.removeItemFromBasket(this.item?.id)
            }
          })
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

    setFavorite(){
      this.userStore.setFavorite(this.item?.id)
    },

    getItem(){
      // Get Item
      axios.get(`${SERVER_URL}/api/item/${this.$route.params.id}`)
          .then(res => {
            this.item = res.data.item
            this.vendor = res.data.vendor

            this.photos = JSON.parse(this.item.characteristics).photos
            this.characteristics = JSON.parse(this.item.characteristics).characteristics

            // Get Other Items Of Vendor
            this.getOtherItemsOfVendor()

            // Get Reviews
            this.getReviews()
          })
    },

    selectPhoto(photoId){
      this.photoSelectedId = photoId
    },

    handleScroll(event){
      const boundBlock = this.rightBlock.getBoundingClientRect()
      if (boundBlock.y + boundBlock.height < -100){
        this.isOpenUpMenu = true
      }else{
        this.isOpenUpMenu = false
      }
    },

    openPhotosList(){
      this.isOpenPhotosList = true
      this.pageStore.openModal('photos-view')

      this.photosListOpenCallback.callback()
    },

    closePhotosList(){
      this.isOpenPhotosList = false
      this.pageStore.closeModal('photos-view')
    },

    // Get Other Items Of Vendor
    getOtherItemsOfVendor(){
      axios.get(`${SERVER_URL}/api/shop/other_items/${this.vendor.id}/${this.$route.params.id}`)
          .then(res => {
            this.otherItemsOfVendor = res.data
          })
    },

    // Get Reviews
    getReviews(){
      axios.get(`${SERVER_URL}/api/reviews/${this.$route.params.id}`)
          .then(res => {
            this.reviews = res.data
          })
    },
  },
}
</script>

<style scoped>

.photo-item{
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.up-menu{
  z-index: 35;
  transform: translateY(-110%);
  opacity: 0;
  transition: .3s;
}

.up-menu.open{
  transform: translateY(0);
  opacity: 1;
}

</style>