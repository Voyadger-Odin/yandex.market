<template>
  <!-- orange-400 -->
  <div
      class="flex w-fit relative"
      :style="`color: ${color ? color : '#f1aa00'}; gap: ${gap ? gap : 0}px`"
  >
    <div
        class="absolute top-0 left-0 w-[100%] h-[100%] cursor-pointer"
        @mousemove="selecting"
        @mouseout="unselecting"
        @click="selected"
        ref="ratingBox"
    />

    <Rating
        :rating="getRating"
        :size="size"
        :gap="gap"
    />
  </div>
</template>

<script>
import {ref} from "vue";
import Rating from "@/uikit/rating/Rating.vue";

export default {
  components: {Rating},
  props: {
    size: Number,
    color: String,
    gap: Number,
    ratingSelectedCallback: Function,
    rating_result: Number,
  },

  setup() {
    const ratingBox = ref(null)
    return {
      ratingBox,
    }
  },

  data(){
    return {
      isSelecting: false,
      rating: 0,
    }
  },

  computed: {
    getRating(){
      return parseFloat(this.getShowRating())
    },
  },

  methods: {
    halfStar(){
      return this.getRating - Math.floor(this.getRating)
    },

    selecting(event){
      this.isSelecting = true
      let percent = event.offsetX / this.ratingBox.offsetWidth
      if(percent < 0){percent = 0}
      if(percent > 1){percent = 1}
      this.rating = percent * 5
    },

    getRatingResult(rating){
      let rating_result = Math.floor(rating)
      const ost = rating - rating_result
      if (0.25 <= ost && ost <= 0.75){
        rating_result += 0.5
      }
      if (0.75 < ost){
        rating_result += 1
      }
      return rating_result
    },

    selected(){
      this.ratingSelectedCallback(this.getRatingResult(this.rating))
    },

    getShowRating(){
      if (this.isSelecting){return this.rating}
      this.rating = 0

      if (this.rating_result == null){
        return this.rating
      }else{
        return this.rating_result
      }
    },

    unselecting(){
      this.isSelecting = false
      if (this.rating_result == null){
        this.rating = 0
      }else{
        this.rating = this.rating_result
      }
    },
  },
}
</script>