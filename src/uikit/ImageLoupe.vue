<template>
  <div class="relative">
    <img :src="image_src">

    <!-- Loupe Cursor -->
    <div
        @mousemove="loupeMove($event)"
        @mouseout="loupeOut"
        class="absolute w-[100%] h-[100%] opacity-50 top-0 left-0"
        ref="loupe_plane"
    >
      <div
          v-if="isShow"
          class="relative"
      >
        <div
            :class="`absolute pointer-events-none border bg-gray-100 border-black opacity-40`"
            :style="`width: ${cursorSize}px; height: ${cursorSize}px; left: calc(${loupe_x}px - ${cursorSize / 2}px); top: calc(${loupe_y}px - ${cursorSize / 2}px); `"
        >
        </div>
      </div>
    </div>
    <!-- End Loupe Cursor -->

    <!-- Image Loupe -->
    <div v-show="isShow" class="absolute top-0 left-[100%] w-[100%] z-30">
      <canvas
          class="ml-[5px] shadow-2xl shadow-black]"
          ref="canvas"
      />
    </div>
    <!-- End Image Loupe -->
  </div>
</template>

<script>

import {ref} from "vue";

export default {
  data(){
    return {
      isShow: false,
      loupe_x: 0,
      loupe_y: 0,
      loupe_x_percent: 0,
      loupe_y_percent: 0,
      imgResultSize: 500,
      cursorSize: 200,
      scale: null
    }
  },

  props: {
    image_src: String,
  },

  setup() {
    const loupe_plane = ref(null)
    const canvas = ref(null)
    return {
      loupe_plane,
      canvas
    }
  },

  mounted() {
    this.canvas.width = this.imgResultSize
    this.canvas.height = this.imgResultSize
    this.scale = this.loupe_plane.offsetWidth / this.cursorSize
  },

  methods: {
    getLoupeX(x){
      if (x < (this.cursorSize / 2)){
        return (this.cursorSize / 2);
      }
      if (x > this.loupe_plane.offsetWidth - (this.cursorSize / 2)){
        return this.loupe_plane.offsetWidth - (this.cursorSize / 2)
      }
      return x
    },

    getLoupeY(y){
      if (y < (this.cursorSize / 2)){
        return (this.cursorSize / 2);
      }
      if (y > this.loupe_plane.offsetHeight - (this.cursorSize / 2)){
        return this.loupe_plane.offsetHeight - (this.cursorSize / 2)
      }
      return y
    },

    loupeMove(event){
      this.isShow = true
      this.loupe_x = this.getLoupeX(event.offsetX)
      this.loupe_y = this.getLoupeY(event.offsetY)

      this.loupe_x_percent = (this.loupe_x - this.cursorSize / 2) / (this.loupe_plane.offsetWidth - this.cursorSize)
      this.loupe_y_percent = (this.loupe_y - this.cursorSize / 2) / (this.loupe_plane.offsetHeight - this.cursorSize)

      this.showImgResult()
    },

    loupeOut(){
      this.isShow = false
    },

    showImgResult(){
      let ctx = this.canvas.getContext('2d')
      let image = new Image;
      image.src = this.image_src;

      image.addEventListener("load", (e) => {
        const img_new_w = this.scale * (this.imgResultSize)
        const img_new_h = this.scale * (this.imgResultSize * (image.height / image.width))

        let x = -(img_new_w - this.imgResultSize) * (this.loupe_x_percent)
        let y = -(img_new_h - this.imgResultSize) * (this.loupe_y_percent)

        ctx.drawImage(image, x, y, img_new_w, img_new_h);
      });
    },
  },
}
</script>

<style scoped>

</style>