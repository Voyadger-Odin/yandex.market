<template>
  <div
      class="avatar-box flex items-center justify-center"
      :style="`width: ${!size ? '46px' : size}; height: ${!size ? '46px' : size}`"
  >
    <img
        class="rounded-[100%] border-[2px] border-[white] img"
        style="width: 93%; height: 93%"
        :src="img"
    >
  </div>
</template>

<script>
export default {
  props: {
    img: String,
    size: String,
  },
}
</script>

<style scoped>
.avatar-box{
  background: linear-gradient(101.67deg,#48cce0 7.19%,#505add 34.11%,#be40c0 62.97%,#fba82b 92.19%);
  border-radius: 100%;
}

.img{
  width: 46px;
  height: 46px;
  object-fit: cover;
}
</style>