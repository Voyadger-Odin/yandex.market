<template>
  {{getRating}}
</template>

<script>
export default {
  props: {
    rating: Number,
  },

  computed: {
    getRating(){
      if(this.rating === Math.floor(this.rating)){
        return `${this.rating}.0`
      }
      return this.rating
    },
  },
}
</script>