<template>
  <div class="flex flex-col items-center">
    <div class="relative">
      <img class="w-[20px]" :src="img">
      <span :v-if="number" class="absolute bg-[red] text-white text-[11px]  py-[0px] px-[4px] rounded-3xl top-0 left-0 -translate-y-[8px] translate-x-[10px] border-[2px] border-[white]">{{number}}</span>
    </div>
    <span class="text-[12px] text-[#777] mt-[5px]">
      <slot/>
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  img: String,
  number: Number
})
</script>

<style lang="scss" scoped>

</style>