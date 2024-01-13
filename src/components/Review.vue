<template>
  <div class="flex gap-3">
    <div class="w-[46px]">
      <img :src="review.img" class="rounded-[50px]">
    </div>
    <div class="flex flex-col gap-3 w-[100%]">
      <div>
        <TextLink class="font-medium">{{review.name}} {{review.surname ? review.surname : ''}}</TextLink>
        <Raiting :raiting="`${review.grade}`" color="#ffb300" :gap="4" :size="13" />
      </div>

      <div class="flex flex-col gap-2 text-[14px]">
        <span><span class="font-medium mr-1">Достоинства:</span> {{review.advantages}}</span>
        <span><span class="font-medium mr-1">Недостатки:</span> {{review.flaws}}</span>
        <span><span class="font-medium mr-1">Комментарий:</span> {{review.comment}}</span>
        <span class="text-gray-500 text-[13px]">11 января 2024</span>
      </div>
    </div>
  </div>
</template>

<script>
import TextLink from "@/uikit/TextLink.vue";
import Raiting from "@/uikit/Raiting.vue";

export default {
  components: {Raiting, TextLink},

  props: {
    review: Object,
  },
}
</script>

<style lang="scss" scoped>

</style>