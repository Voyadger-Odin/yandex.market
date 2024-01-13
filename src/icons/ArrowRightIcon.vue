<template>
  <svg :width="size ? size : 16" :height="size ? size : 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m.664 1.5 3 3-3 3" stroke="#21201F" stroke-width="1.2" stroke-linecap="round"></path>
  </svg>
</template>

<script>
export default {
  props: {
    size: Number,
  },
}
</script>