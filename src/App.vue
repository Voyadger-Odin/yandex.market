<template>
  <div :class="`flex flex-col min-h-[100vh] ${pageStore.modals.length > 0 ? 'modal-open' : ''} `">
    <Header/>
    <RouterView/>
    <Footer/>
  </div>
</template>

<script lang="js">
import {useUserStore} from '@/utils/stores/UserStore'
import API, {SERVER_URL} from "@/utils/api.js";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import PhotosView from "@/uikit/PhotosView.vue";
import {usePageStore} from '@/utils/stores/PageStore.js'

export default {
  components: {PhotosView, Footer, Header},
  data() {
    return {
      userStore: null,
      accessToken: null,
      pageStore: null,
    }
  },

  beforeCreate() {
    this.userStore = useUserStore()
    this.userStore.getUserInfo()
  },

  beforeMount() {
    this.pageStore = usePageStore()
  },

  methods: {
    showModal(){
      return false
    },
  },
}

</script>

<style scoped>

.modal-open{
  overflow: hidden;
}
</style>
