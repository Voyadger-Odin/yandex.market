<template>
  <div :class="` w-[${size+5}px] h-[${size+10}px]`">

    <svg
        v-if="!isFavorite"
        aria-hidden="true"
        id="wishlist"
        viewBox="0 0 22 21"
        xmlns="http://www.w3.org/2000/svg"
        :width="size ? size : 16" :height="size ? size : 16"
        class="_272iQ"
        style="color: rgb(189, 189, 188);">
      <path d="M16.226 14.753A41.24 41.24 0 0 1 11 18.934a41.22 41.22 0 0 1-5.226-4.181c-1.253-1.194-2.463-2.534-3.355-3.915C1.52 9.448 1 8.099 1 6.87c0-3.678 2.548-5.496 5.024-5.496 1.592 0 3.109.74 4.203 2.071l.773.94.772-.94c1.09-1.327 2.61-2.071 4.204-2.071C18.452 1.375 21 3.193 21 6.871c0 1.228-.52 2.576-1.419 3.967-.892 1.38-2.102 2.722-3.355 3.915z" stroke="currentColor" fill="#fff" stroke-width="2"/>
    </svg>

    <svg
        v-else
        aria-hidden="true"
        id="wishlist-active"
        viewBox="0 0 22 21"
        xmlns="http://www.w3.org/2000/svg"
        :width="size ? size : 16" :height="size ? size : 16"
        class="_272iQ _1_S3H"
        style="color: rgb(189, 189, 188);">
      <path d="M16.226 14.753A41.24 41.24 0 0 1 11 18.934a41.22 41.22 0 0 1-5.226-4.181c-1.253-1.194-2.463-2.534-3.355-3.915C1.52 9.448 1 8.099 1 6.87c0-3.678 2.548-5.496 5.024-5.496 1.592 0 3.109.74 4.203 2.071l.773.94.772-.94c1.09-1.327 2.61-2.071 4.204-2.071C18.452 1.375 21 3.193 21 6.871c0 1.228-.52 2.576-1.419 3.967-.892 1.38-2.102 2.722-3.355 3.915z" stroke="#FC5230" fill="#FC5230" stroke-width="2" />
    </svg>

  </div>
</template>

<script>
export default {
  props: {
    size: Number,
    isFavorite: Boolean,
  },
}
</script>