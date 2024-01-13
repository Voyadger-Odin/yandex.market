<template>
  <div :class="`flex flex-col min-h-[100vh] ${pageStore.modals.length > 0 ? 'modal-open' : ''} `">
    <Header/>
    <RouterView/>
    <Footer/>
  </div>
</template>

<script lang="js">
import {useUserStore} from '@/stores/UserStore'
import API, {SERVER_URL} from "@/api.js";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import PhotosView from "@/uikit/PhotosView.vue";
import {usePageStore} from '@/stores/PageStore.js'

export default {
  components: {PhotosView, Footer, Header},
  data() {
    return {
      userStore: null,
      accessToken: null,
      pageStore: null,
    }
  },

  beforeMount() {
    this.userStore = useUserStore()
    this.pageStore = usePageStore()
  },

  mounted() {
    this.accessToken = localStorage.getItem('access_token')

    if (this.accessToken){
      API.post(`${SERVER_URL}/api/auth/me`)
          .then(res => {
            this.userStore.user = res.data
            console.log(this.userStore.user)
          })
    }
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
