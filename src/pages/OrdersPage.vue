<template>
  <div class="w-[100%] mt-[20px] flex justify-center">
    <div class="h-[100%] w-[70%] flex flex-col gap-10">
      <h1 class="font-medium text-[45px]">Мои заказы</h1>

      <div
          v-if="orders?.length === 0"
          class="flex justify-center items-center h-[100%]"
      >
        <span class="text-gray-500 text-[20px]">Вы ещё ничего не заказали 😔</span>
      </div>

      <div class="grid grid-cols-1 gap-5">
        <CardOrder
            v-for="order in orders"
            :key="orders.id"
            :order="order"
            :send-review-function="sendReviewOpenModal"
        />
      </div>
    </div>
  </div>

  <!-- Review Modal -->
  <Modal
      :is-open="isOpenModalReview"
      :close-function="closeModalReview"
  >
    <div class="flex flex-col gap-5 p-3 w-[500px]">
      <span class="text-[18px]">{{reviewOrderTitle}}</span>

      <!-- Rating -->
      <div class="flex flex-col gap-1">
        <span class="text-[20px] font-medium">Оценка<span v-if="reviewRating">: <RatingNumber :rating="reviewRating" /></span></span>
        <RatingSelect
            :size="40"
            :gap="5"
            :rating-selected-callback="ratingSelected"
            :rating_result="reviewRating"
            ref="ratingSelector"
        />
      </div>
      <!-- End Rating -->

      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-1">
          <label>Достоинства:</label>
          <textarea
              v-model="reviewAdvantages"
              class="outline-none p-2 rounded"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label>Недостатки:</label>
          <textarea
              v-model="reviewFlaws"
              class="outline-none p-2 rounded"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label>Комментарий:</label>
          <textarea
              v-model="reviewComment"
              class="outline-none p-2 rounded"
          />
        </div>
      </div>

      <ButtonLarge
          v-if="reviewRating"
          @click="sendReview"
          class="mt-5"
      >
        {{(!this.reviewAdvantages && !this.reviewFlaws && !this.reviewComment) ?
          'Отправить без отзыва'
          :
          'Отправить отзыв'
        }}
      </ButtonLarge>
    </div>
  </Modal>
  <!-- End Review Modal -->
</template>

<script>
import {useUserStore} from '@/utils/stores/UserStore';
import API, {SERVER_URL} from "@/utils/api.js";
import CardOrder from "@/components/CardItem/CardOrder.vue";
import Modal from "@/uikit/Modal.vue";
import RatingSelect from "@/uikit/rating/RatingSelect.vue";
import ButtonLarge from "@/uikit/ButtonLarge.vue";
import {ref} from "vue";
import RatingNumber from "@/uikit/RatingNumber.vue";

export default {
  components: {RatingNumber, ButtonLarge, RatingSelect, Modal, CardOrder},

  setup() {
    const ratingSelector = ref(null)
    return {
      ratingSelector,
    }
  },

  data(){
    return {
      userStore: null,
      orders: null,

      // Review
      isOpenModalReview: false,
      orderReviewSelectedId: null,
      orderReviewSelectedItemId: null,
      reviewOrderTitle: null,
      reviewRating: null,
      reviewAdvantages: '',
      reviewFlaws: '',
      reviewComment: '',
    }
  },

  beforeMount() {
    this.userStore = useUserStore()
    this.getOrdersList()
  },

  mounted() {
    document.addEventListener('keydown', this.closeModalReviewEscapeKeydown)
  },

  unmounted() {
    document.removeEventListener('keydown', this.closeModalReviewEscapeKeydown)
  },

  methods: {
    getOrdersList(){
      API.get(`${SERVER_URL}/api/auth/orders`)
          .then(res => {
            this.orders = res.data
          })
    },

    getOrderIndexById(order_id){
      for(let i=0; i<this.orders.length; i++){
        if (this.orders[i].id === order_id){
          return i
        }
      }
    },

    sendReviewOpenModal(order_id){
      this.reviewRating = null
      this.reviewAdvantages = ''
      this.reviewFlaws = ''
      this.reviewComment = ''

      const order_index = this.getOrderIndexById(order_id)
      this.orderReviewSelectedItemId = this.orders[order_index].item_id
      this.reviewOrderTitle = this.orders[order_index].title

      this.isOpenModalReview = true
      this.orderReviewSelectedId = order_id
    },

    closeModalReviewEscapeKeydown(event){
      if(event.code === 'Escape'){
        this.closeModalReview()
      }
    },

    closeModalReview(){
      this.isOpenModalReview = false
    },

    ratingSelected(rating){
      this.reviewRating = rating
    },

    sendReview(){
      const review = {
        orderId: this.orderReviewSelectedId,
        itemId: this.orderReviewSelectedItemId,
        rating: this.reviewRating,
        onlyRating: (!this.reviewAdvantages && !this.reviewFlaws && !this.reviewComment),
        advantages: this.reviewAdvantages,
        flaws: this.reviewFlaws,
        comment: this.reviewComment,
      }

      API.post(`${SERVER_URL}/api/auth/reviews`, {'review': review})
          .then(res => {
            this.getOrdersList()
            this.closeModalReview()
          })
    },
  },
}
</script>

<style scoped>

</style>