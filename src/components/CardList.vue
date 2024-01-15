<template>
  <div class="grid grid-cols-5 gap-3">
    <CardItem2
        v-for="item in items"
        :key="item.id"
        :item="item"
    />
  </div>
</template>

<script>
import CardItem2 from "@/components/CardItem/CardItem2.vue";

export default {
  components: {CardItem2},

  props: {
    items: Array,
  },
}
</script>

<style lang="scss" scoped>

</style>