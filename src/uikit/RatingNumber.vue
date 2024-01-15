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
      let newRating = Math.floor(this.rating * 10) / 10
      if(newRating === Math.floor(newRating)){
        return `${newRating}.0`
      }
      return newRating
    },
  },
}
</script>