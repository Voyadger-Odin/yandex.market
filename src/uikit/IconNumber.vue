<template>
  <div class="relative">
    <slot/>
    <span
        v-if="number"
        class="
        absolute
        bg-[red]
        text-white
        text-[11px]
        py-[0px] px-[4px]
        rounded-3xl
        top-0
        -translate-y-[8px]
        border-[2px]
        border-[white]
        "
        :style="`
        right: ${right ? right : '10px'}
        `"
    >
      {{number}}
    </span>
  </div>
</template>

<script setup>
defineProps({
  number: Number,
  right: String,
})
</script>