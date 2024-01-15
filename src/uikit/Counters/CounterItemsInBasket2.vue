<template>
  <div class="flex bg-gray-200 rounded-2xl overflow-hidden">
    <!-- Less -->
    <button
        @click="remove_"
        class="flex justify-center items-center w-[50px] h-[50px] hover:bg-gray-300 transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
      </svg>
    </button>
    <!-- End Less -->

    <!-- Count -->
    <div class="flex justify-center flex-1 text-center items-center font-medium">
      {{count}}
    </div>
    <!-- End Count -->

    <!-- More -->
    <button
        @click="add_"
        class="flex justify-center items-center w-[50px] h-[50px] hover:bg-gray-300 transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
      </svg>
    </button>
    <!-- End More -->
  </div>
</template>

<script>
export default {
  props: {
    count: Number,
    add: Function,
    remove: Function,
    itemId: Number,
    bgColor: String,
    buttonsHoverColor: String,
  },

  methods: {
    add_(){
      this.add(this.itemId)
    },

    remove_(){
      this.remove(this.itemId)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>