<template>
  <div class="flex gap-3">
    <div class="w-[46px]">
      <img :src="review.img" class="rounded-[50px]">
    </div>
    <div class="flex flex-col gap-3 w-[100%]">
      <div>
        <TextLink class="font-medium">{{review.name}} {{review.surname ? review.surname : ''}}</TextLink>
        <Rating :rating="review.grade" color="#ffb300" :gap="4" :size="13" />
      </div>

      <div class="flex flex-col gap-2 text-[14px]">
        <span v-if="review.advantages"><span class="font-medium mr-1">Достоинства:</span> {{review.advantages}}</span>
        <span v-if="review.flaws"><span class="font-medium mr-1">Недостатки:</span> {{review.flaws}}</span>
        <span v-if="review.comment"><span class="font-medium mr-1">Комментарий:</span> {{review.comment}}</span>
        <span class="text-gray-500 text-[13px]">{{dateConverter(review.created_at)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TextLink from "@/uikit/TextLink.vue";
import Rating from "@/uikit/rating/Rating.vue";
import {dateConverter} from '@/utils/helpers/datetime.js';

export default {
  methods: {dateConverter},
  components: {Rating, TextLink},

  props: {
    review: Object,
  },
}
</script>

<style lang="scss" scoped>

</style>