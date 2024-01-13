<template>
  <header class="flex items-center justify-between gap-5 px-[10px] py-[10px] shadow">

    <!-- Logo -->
    <RouterLink to="/">
      <div class="flex items-center gap-2">
        <LogoHeader/>
      </div>
    </RouterLink>
    <!-- End Logo -->

    <!-- Search -->
    <div class="flex gap-3">
      <button class="bg-[#fc0] px-[20px] py-[10px] rounded-[8px] hover:bg-[#ffdd00] transition-[.5s]">Каталог</button>
      <div class="bg-[#fc0] p-[2px] pr-[90px] relative flex items-center rounded rounded-tr-[8px] rounded-br-[8px]">
        <input class="outline-none p-[10px] w-[50vw]" placeholder="Искать товары">
        <button class="bg-[#fc0] px-4 py-2 rounded font-medium absolute right-[5px] hover:bg-[#ffe280] transition">Найти</button>
      </div>
    </div>
    <!-- End Search -->

    <!-- Is Auth -->
    <div v-if="userStore?.user" class="flex gap-4 items-center">

      <!-- Plus Points -->
      <div class="flex flex-col justify-center items-center">
        <PlusPoints class="cursor-pointer">50</PlusPoints>
        <span class="text-[12px] text-[#777] mt-[3px]">Баллы</span>
      </div>
      <!-- End Plus Points -->

      <!-- Orders -->
      <RouterLink :to="{name: 'orders'}">
        <IconNumber img="/img/box.svg">Заказы</IconNumber>
      </RouterLink>
      <!-- End Orders -->

      <!-- Favorites -->
      <RouterLink :to="{name: 'favorites'}">
        <IconNumber img="/img/favorites.svg" :number="3">Избранное</IconNumber>
      </RouterLink>
      <!-- End Favorites -->

      <!-- Basket -->
      <RouterLink :to="{name: 'basket'}">
        <IconNumber img="/img/basket.svg" :number="5">Корзина</IconNumber>
      </RouterLink>
      <!-- End Basket -->

      <!-- Profile -->
      <ProfileMenu/>
      <!-- End Profile -->
    </div>
    <!-- End Is Auth -->

    <!-- No Auth -->
    <div v-if="!userStore?.user">
      <button @click="toLogin" class="bg-[#eee] px-[15px] py-[10px] rounded-[8px] active:bg-[#ccc] active:text-[10pt] active:px-[19px] transition-[.2s]">Войти</button>
    </div>
    <!-- End No Auth -->
  </header>
</template>

<script>
import API, {SERVER_URL} from "@/api.js";
import {accessToken} from "@/stores/auth.js";
import IconNumber from "@/uikit/IconNumber.vue";
import ProfileMenu from "@/components/ProfileMenu.vue";
import {useUserStore} from '@/stores/UserStore'
import LogoHeader from "@/uikit/LogoHeader.vue";
import PlusPoints from "@/uikit/PlusPoints.vue";

export default {
  components: {PlusPoints, LogoHeader, ProfileMenu, IconNumber},

  data() {
    return {
      userStore: null,
    }
  },

  mounted() {
    this.userStore = useUserStore()
  },

  methods: {
    logOut() {
      API.post(`${SERVER_URL}/api/auth/logout`)
          .then(res => {
            localStorage.removeItem('access_token')
            accessToken.value = null
            this.$forceUpdate()
            this.$router.push({name: 'login'})
          })
    },

    toLogin() {
      this.$router.push({name: 'login'})
    },
  },
}
</script>

<style scoped>
.{
  background: #ffdd00;
}

</style>