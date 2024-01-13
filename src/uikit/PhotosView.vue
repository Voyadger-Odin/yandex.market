<template>
  <div
      :class="`flex fixed gap-5 top-0 left-0 bg-white w-[100vw] h-[100vh] z-50 transition ${isOpen ? '' : 'close'}`"
  >
    <!-- Photos List -->
    <div class="p-[20px] overflow-y-scroll h-[100%] photos-list">
      <div
          v-for="(photo, i) in photos"
          :class="`
          w-[150px]
          h-[200px]
            flex
            justify-center
            items-center
            p-[15px]
            border-[2px]
            hover:border-yellow-300
            rounded-2xl
            transition
            cursor-pointer
            my-[15px]
            ${(i === photoSelectedId) ? 'border-yellow-300' : 'border-[#0000]'}
            `"
          @click="selectPhoto(i)"
      >
        <img :src="photo">
      </div>
    </div>
    <!-- End Photos List -->

    <!-- Photo -->
    <div
        class="relative h-[100%] flex-1 pb-5 overflow-hidden photo-box"
        @mouseover="hoverPhoto"
        @mouseleave="hoverOutPhoto"
    >
      <img class="photo" :src="photos[photoSelectedId]">

      <!-- Numbers -->
      <div
          :class="`${isHoverPhoto ? '' : 'numbers-out'} absolute transition bottom-2 left-[50%] font-light text-[15px] text-gray-500`"
      >
        {{photoSelectedId + 1}} / {{photos.length}}
      </div>
      <!-- End Numbers -->

      <!-- Close Button -->
      <ButtonRound
          :class="`${isHoverPhoto ? '' : 'close-btn-out'} transition absolute top-[2%] right-[2%]`"
          @click="closeFunction"
      >
        <DeleteIcon class="" />
      </ButtonRound>
      <!-- End Close Button -->

      <!-- Left Button -->
      <ButtonRound
          v-if="photoSelectedId > 0"
          :class="`${isHoverPhoto ? '' : 'left-btn-out'} transition absolute top-[50%] left-[2%]`"
          @click="slideLeft"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
        </svg>
      </ButtonRound>
      <!-- End Left Button -->

      <!-- Right Button -->
      <ButtonRound
          v-if="photoSelectedId < photos.length - 1"
          :class="`${isHoverPhoto ? '' : 'right-btn-out'} transition absolute top-[50%] right-[2%]`"
          @click="slideRight"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
        </svg>
        <!-- End Right Button -->
      </ButtonRound>
      <!-- End Close Button -->
    </div>
    <!-- End Photo -->
  </div>
</template>

<script>
import DeleteIcon from "@/icons/DeleteIcon.vue";
import ButtonRound from "@/uikit/Buttons/ButtonRound.vue";
import ArrowRightIcon from "@/icons/ArrowRightIcon.vue";
import ArrowLeftIcon from "@/icons/ArrowLeftIcon.vue";

export default {
  components: {ButtonRound, DeleteIcon},

  props: {
    photos: Array,
    isOpen: Boolean,
    closeFunction: Function,
    photosListOpenCallback: Object,
  },

  data() {
    return {
      //photos: ['https://avatars.mds.yandex.net/get-mpic/10637301/2a0000018b1a05d9ba16cdde7d13a3b994e2/optimize'],
      photoSelectedId: 0,
      isHoverPhoto: false,
    }
  },

  mounted() {
    document.addEventListener('keydown', this.escape)
  },

  unmounted() {
    document.removeEventListener('keydown', this.escape)
  },

  beforeMount() {
    this.photosListOpenCallback.callback = this.open
  },

  methods: {
    escape(event){
      if (event.key === 'Escape'){
        this.closeFunction()
      }
    },

    selectPhoto(photoId){
      this.photoSelectedId = photoId
    },

    open(){
      this.photoSelectedId = 0
    },

    hoverPhoto(){
      this.isHoverPhoto = true
    },
    hoverOutPhoto(){
      this.isHoverPhoto = false
    },

    slideLeft(){
      if (this.photoSelectedId > 0){
        this.photoSelectedId--
      }
    },
    slideRight(){
      if (this.photoSelectedId < this.photos.length - 1){
        this.photoSelectedId++
      }
    },
  },
}
</script>

<style scoped>
.close{
  transform: scale(1.1);
  pointer-events: none;
  opacity: 0;
}

.photos-list::-webkit-scrollbar {
  display: none;
}

.photo{
  width: 100%;
  height: 100%;
  padding: 20px;
  object-fit: contain;
}

.close-btn-out{
  transform: translate(100px, -100px);
  opacity: 0;
}
.left-btn-out{
  transform: translateX(-100px);
  opacity: 0;
}
.right-btn-out{
  transform: translateX(100px);
  opacity: 0;
}
.numbers-out{
  transform: translateY(50px);
  opacity: 0;
}


</style>