<template>
  <p :class="'mt-2 ' + (!isOpen ? 'line-clamp-[' + (lineCount ? lineCount : 5) + ']' : '') + ' text-[15px]'"><slot/></p>
  <span v-if="!isOpen" @click="openText" class="flex w-fit gap-1 text-slate-500 hover:text-slate-400 cursor-pointer text-[13px]">Больше <span class="pt-[3px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
      </svg>
    </span>
  </span>
  <span v-if="isOpen" @click="closeText" class="flex w-fit gap-1 text-slate-500 hover:text-slate-400 cursor-pointer text-[13px]">Меньше <span class="pt-[3px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
      </svg>
    </span>
  </span>
</template>

<script>
export default {
  data(){
    return {
      isOpen: false,
    }
  },

  props: {
    lineCount: Number,
  },

  methods: {
    openText() {
      this.isOpen = true
    },

    closeText() {
      this.isOpen = false
    },
  },
}
</script>

<style lang="scss" scoped>

</style>