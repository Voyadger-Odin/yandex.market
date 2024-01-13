<template>
  <div class="flex flex-col">
    <div class="card-img-box-square">
      <div class="card-img-box">

        <RouterLink :to="{name: 'item_detail', params: {id: item.id}}" target="_blank">
          <div class="card-img">
            <img class="img" :src="photos[0]">
          </div>
        </RouterLink>

      </div>
    </div>

    <div class="flex flex-col gap-1 p-[10px]">
      <!-- Price -->
      <div>
        <span class="price">
          <Price :price="item.promotion ? item.price_promotion : item.price" />
        </span>
        <span class="old-price">
          <Price :price="item.price" />
        </span>
      </div>
      <!-- End Price -->

      <!-- Title -->
      <p class="title">{{item.title}}</p>
      <!-- End Title -->

      <!-- Rating -->
      <div class="flex items-center gap-1 text-[13px]">
        <Raiting :raiting="`${item.rating}`" :size="12"/>
        <span class="text-slate-500 text-[11px]">({{item.rating_count}})</span>
      </div>
      <!-- End Rating -->
    </div>


    <div class="flex-1"></div>

    <ButtonLarge class="p-[5px] rounded-[5px] text-[13px]">
      В корзину
    </ButtonLarge>
  </div>
</template>

<script>
import ButtonLarge from "@/uikit/ButtonLarge.vue";
import Raiting from "@/uikit/Raiting.vue";
import Price from "@/uikit/Price.vue";

export default {
  components: {Price, Raiting, ButtonLarge},
  data() {
    return {
      photos: [],
    }
  },

  props: {
    item: Object,
  },

  mounted() {
    this.photos = JSON.parse(this.item.characteristics).photos
  },
}
</script>

<style scoped>
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
  color: #0d6b07;
}

.old-price{
  text-decoration: line-through;
  font-size: 13px;
  color: #777;
  margin-left: 10px;
}
</style>