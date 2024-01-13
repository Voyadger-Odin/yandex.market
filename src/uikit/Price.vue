<template>
  <span>
    {{getPrice}}<span v-if="currency != ''"> </span><span v-if="currency != ''">{{currency ? currency : '₽'}}</span>
  </span>
</template>

<script>
export default {
  props: {
    price: Number,
    currency: String,
  },

  computed: {
    getPrice(){
      if (this.price == null){return ''}
      let resultPrice = ''
      const priceStr = `${this.price}`
      for(let i=priceStr.length-1; i>=0; i--){
        resultPrice = priceStr[i] + resultPrice
        if ((priceStr.length - i) % 3 === 0){
          resultPrice = ' ' + resultPrice
        }
      }
      return resultPrice
    },
  },
}
</script>