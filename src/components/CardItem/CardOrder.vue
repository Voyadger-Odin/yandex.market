<template>
  <div class="border border-gray-300">
    <!-- Header -->
    <div class="flex p-3 bg-gray-100 border-b border-gray-300">
      <div class="flex flex-col">
        <span>Заказ № {{order.id}} </span>
        <div class="flex items-center gap-2">
          <div class="bg-green-600 w-[15px] h-[15px] rounded-3xl" />
          <span class="text-[20px] font-medium">Уже у вас</span>
        </div>
        <span>{{order.address}}</span>
      </div>

      <div class="flex-1" />


      <div class="h-[80px]">
        <img
            src="https://blog.aspose.com/ru/barcode/generate-barcodes-in-node-js-applications/images/generate-barcode-java.png#center"
            class="img-code"
        >
      </div>

    </div>
    <!-- End Header -->

    <!-- Body -->
    <div class="flex gap-5 p-5">
      <!-- Item -->
      <div class="w-[30%]">
        <div class="flex flex-col gap-2">
          <!-- IMG -->
          <RouterLink :to="{name: 'item_detail', params: {id: order.item_id}}">
            <div class="card-img-box-square">
              <div class="card-img-box">
                <div class="card-img">
                  <img
                      class="img" :src="photo"
                  >
                </div>
              </div>
            </div>
          </RouterLink>
          <!-- End IMG -->

          <div class="flex flex-col gap-2">
            <RouterLink :to="{name: 'item_detail', params: {id: order.item_id}}">
              <TextLink>
                <p class="title">
                  {{order.full_title}}
                </p>
              </TextLink>
            </RouterLink>

            <!-- Price -->
            <div>
              <Price
                  :price="order.promotion ? order.item_price_promotion : order.item_price"
                  class="font-bold"
              />
              <Price
                  v-if="order.promotion"
                  :price="order.item_price"
                  class="line-through ml-3 text-[13px] text-gray-500"
              />
            </div>
            <!-- End Price -->
          </div>
        </div>
      </div>
      <!-- End Item -->

      <!-- Description -->
      <div class="flex flex-col flex-1 gap-3">
        <div class="description-item">
          <span class="description-name">Дата оформления:</span>
          <span class="description-data flex-1">{{datetimeConverter(order.created_at)}}</span>
        </div>

        <span class="text-[20px] font-medium">Способ оплаты</span>

        <div class="description-item">
          <span class="description-name">Картой онлайн</span>
          <span class="description-data flex-1">
            <Price :price="order.price" class="font-bold"/>, оплачено
          </span>
        </div>

        <span class="text-[20px] font-medium">Способ получения</span>

        <div class="description-item">
          <span class="description-name">Адрес:</span>
          <span class="description-data flex-1">{{order.address}}</span>
        </div>

        <div class="description-item">
          <span class="description-name">Получатель:</span>
          <span class="description-data flex-1">{{`${userStore.user?.name} ${userStore.user?.surname}, ${userStore.user?.email}`}}</span>
        </div>

        <div class="description-item">
          <span class="description-name">Срок хранения:</span>
          <span class="description-data flex-1">до 9 января</span>
        </div>

        <div class="description-item">
          <span class="description-name">Стоимость доставки:</span>
          <span class="description-data flex-1 text-green-600">бесплатно</span>
        </div>

        <div class="flex-1" />

        <ButtonLarge
            v-if="!order.grade"
            @click="sendReviewFunction(order.id)"
        >
          Оценить товар
        </ButtonLarge>
        <div
            v-else
            class="flex flex-col"
        >
          <Raiting
              :raiting="order.grade"
              :size="23"
              :gap="10"
          />

          <div class="flex flex-col gap-1 mt-3 text-[13px]">
            <span
                v-if="order.advantages"
            >
              <span class="font-medium">Достоинства: </span>
              {{order.advantages}}
            </span>
            <span
                v-if="order.flaws"
            >
              <span class="font-medium">Недостатки: </span>
              {{order.flaws}}
            </span>
            <span
                v-if="order.comment"
            >
              <span class="font-medium">Комментарий: </span>
              {{order.comment}}
            </span>
          </div>
        </div>

      </div>
      <!-- End Description -->
    </div>
    <!-- End Body -->
  </div>
</template>

<script>

import Price from "@/uikit/Price.vue";
import ButtonLarge from "@/uikit/ButtonLarge.vue";
import {datetimeConverter} from "@/utils/helpers/datetime.js";
import {useUserStore} from '@/utils/stores/UserStore.js';
import TextLink from "@/uikit/TextLink.vue";
import Raiting from "@/uikit/rating/Raiting.vue";

export default {
  components: {Raiting, TextLink, ButtonLarge, Price},

  props: {
    order: Object,
    sendReviewFunction: Function,
  },

  data(){
    return {
      photo: null,
      userStore: null,
    }
  },

  beforeMount() {
    this.userStore = useUserStore()
    this.photo = JSON.parse(this.order?.characteristics)?.photos[0]
  },

  methods: {
    datetimeConverter,

  },
}
</script>

<style scoped>

.description-item{
  display: flex;
  font-size: 15px;
}

.description-name{
  width: 30%;
  color: #6b6b6b;
}

.description-data{

}


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

.old-price{
  text-decoration: line-through;
  font-size: 13px;
  color: #777;
  margin-left: 10px;
}

.img-code{
  width: 100%;
  height: 100%;
  object-fit: contain;
}

</style>