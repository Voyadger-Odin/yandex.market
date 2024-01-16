<template>
  <div class="w-[100%] flex justify-center">
    <div class="h-[100%] w-[70%] flex flex-col gap-10">
      <div class="flex items-end gap-5">
        <h1 class="font-medium text-[30px]">Корзина</h1>
        <span class="text-[15px] text-gray-500 pb-[5px]">{{items ? items.length : 0}} {{numWord(items ? items.length : 0, ['товар', 'товара', 'товаров'])}}</span>
      </div>

      <div
          v-if="items"
          class="flex gap-10"
      >
        <!-- Items -->
        <div class="flex w-[70%] flex-col gap-5">
          <div
              v-for="item in items"
              :key="item.id"
              class="flex flex-col gap-5"
          >
            <hr>
            <div class="flex gap-5 items-start">
              <CheckBox :id="`item-select-${item.id}`" :checked="true" />
              <CardItemBasket
                  class="flex-1"
                  :item="item"
                  :add="addItemCount"
                  :remove="removeItemCount"
                  :remove-item-from-basket="removeItemFromBasket"
              />
            </div>
          </div>

          <div
              v-if="items.length === 0"
              class="flex justify-center items-center h-[100%]"
          >
            <span class="text-gray-500 text-[20px]">Корзина пока пуста 😔</span>
          </div>
        </div>
        <!-- End Items -->

        <!-- Right Panel -->
        <div class="flex w-[30%]">
          <div class="flex flex-col gap-5">
            <Card>
              <div class="flex flex-col gap-1">
                <div class="flex text-[13px] font-medium">
                  <span class="flex-1">Всего: {{items ? items.length : 0}} {{numWord(items ? items.length : 0, ['товар', 'товара', 'товаров'])}}</span>
                  <span class="flex flex-1 justify-end"><Price :price="total_price" /></span>
                </div>
                <hr>
                <div class="flex text-[13px] font-medium">
                  <span class="flex-1">Выгода</span>
                  <span class="flex flex-1 justify-end">-<Price :price="promotion_price" /></span>
                </div>
              </div>

              <input
                  type="text"
                  placeholder="Промокод"
                  class="my-4 p-2 outline-none rounded-xl w-[100%] border"
              >

              <div class="flex text-[13px] font-medium text-[20px]">
                <span class="flex-1">Итого</span>
                <span class="flex flex-1 justify-end">
                <Price :price="result_price" />
              </span>
              </div>
            </Card>

            <ButtonLarge @click="setOrder">Оформить заказ</ButtonLarge>
          </div>
        </div>
        <!-- End Right Panel -->
      </div>
    </div>
  </div>
</template>

<script>
import CardItemBasket from "@/components/CardItem/CardItemBasket.vue";
import API, {SERVER_URL} from "@/utils/api.js";
import Card from "@/uikit/Card.vue";
import Price from "@/uikit/Price.vue";
import ButtonLarge from "@/uikit/ButtonLarge.vue";
import {useUserStore} from '@/utils/stores/UserStore';
import {numWord} from '@/utils/helpers/words.js';
import CheckBox from "@/uikit/CheckBox.vue";

export default {
  components: {CheckBox, ButtonLarge, Price, Card, CardItemBasket},

  data(){
    return {
      items: null,
      total_price: null,
      promotion_price: null,
      result_price: null,
      userStore: null,
    }
  },

  beforeMount() {
    this.userStore = useUserStore()
    this.getItems()
  },

  methods: {
    numWord,

    getItems(){
      API.get(`${SERVER_URL}/api/auth/basket`)
          .then(res => {
            this.items = res.data
            this.calculatePrice()
          })
    },

    calculatePrice(){
      this.total_price = 0
      this.promotion_price = 0
      this.result_price = 0

      this.items.forEach((item) => {
        this.total_price += item.price * item.count
        if (item.promotion){
          this.promotion_price += item.price_promotion * item.count
          this.result_price += item.price_promotion * item.count
        }else{
          this.result_price += item.price * item.count
        }
      })

      this.promotion_price = this.total_price - this.result_price
    },

    addItemCount(id){
      API.post(`${SERVER_URL}/api/auth/basket/${id}/${this.userStore.basket[id].count + 1}`)
          .then(res => {
            if(res.status === 200){
              this.userStore.basket[id].count = res.data.count
              this.items[this.getItemPositionById(id)].count = res.data.count
              this.calculatePrice()
            }
          })
    },

    removeItemCount(id){
      API.post(`${SERVER_URL}/api/auth/basket/${id}/${this.userStore.basket[id].count - 1}`)
          .then(res => {
            if(res.status === 200){
              this.userStore.basket[id].count = res.data.count
              this.items[this.getItemPositionById(id)].count = res.data.count
              this.calculatePrice()

              if (res.data.count === 0){
                this.removeItemFromBasket(id)
              }
            }
          })
    },

    removeItemFromBasket(item_id){
      this.userStore.removeItemFromBasket(item_id, () => {
        this.items.splice(this.getItemPositionById(item_id), 1)
        this.calculatePrice()
      })
    },

    getItemPositionById(id){
      for(let i=0; i<this.items.length; i++){
        if (this.items[i].id === id){
          return i
        }
      }
    },

    setOrder(){
      API.post(`${SERVER_URL}/api/auth/orders`, {
        basket: this.userStore.basket
      })
          .then(res => {
            this.userStore.basket = {}
            this.getItems()
          })
    },
  },
}
</script>

<style scoped>

</style>