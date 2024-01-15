<template>
  <div
      @click="closeFunction"
      :class="`fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center modal ${isOpen ? 'open' : ''}`"
  >
    <Card
        @click.stop
        class="relative"
    >
      <slot/>

      <!-- Close Button -->
      <div
          @click="closeFunction"
          class="absolute top-3 right-3 cursor-pointer"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28" height="28"
            viewBox="0 0 28 28"
            fill="none">
          <rect width="28" height="28" rx="14" fill="black" fill-opacity="0.15"></rect>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.6463 9.5538C19.8416 9.35854 19.8416 9.04195 19.6463 8.84669L19.1534 8.3538C18.9582 8.15854 18.6416 8.15854 18.4463 8.3538L13.9999 12.8002L9.55343 8.3538C9.35817 8.15854 9.04159 8.15854 8.84632 8.3538L8.35343 8.84669C8.15817 9.04195 8.15817 9.35854 8.35343 9.5538L12.7999 14.0002L8.35343 18.4467C8.15817 18.642 8.15817 18.9585 8.35343 19.1538L8.84632 19.6467C9.04159 19.842 9.35817 19.842 9.55343 19.6467L13.9999 15.2002L18.4463 19.6467C18.6416 19.842 18.9582 19.842 19.1534 19.6467L19.6463 19.1538C19.8416 18.9585 19.8416 18.642 19.6463 18.4467L15.1999 14.0002L19.6463 9.5538Z" fill="#21201F"></path>
        </svg>
      </div>
      <!-- End Close Button -->
    </Card>
  </div>
</template>

<script>
import Card from "@/uikit/Card.vue";
import ButtonLarge from "@/uikit/ButtonLarge.vue";

export default {
  components: {Card},

  props: {
    isOpen: Boolean,
    closeFunction: Function,
  },
}
</script>

<style scoped>
.modal{
  pointer-events: none;
  background: #000d;
  opacity: 0;
  transform: scale(1.1);
  transition: .2s;
}

.modal.open{
  pointer-events: all;
  opacity: 1;
  transform: scale(1);
}
</style>