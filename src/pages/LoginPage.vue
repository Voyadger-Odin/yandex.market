<template>
  <div class="flex justify-center mt-[100px]">
    <Card class="flex flex-col gap-[20px]">
      <h1 class="text-[20px] font-medium">Авторизация</h1>
      <div v-if="error">
        <p class="error" >{{error}}</p>
        <br>
      </div>

      <input
          v-model="email"
          type="text"
          name="email"
          placeholder="Логин"
          class="outline-none p-2 rounded-xl bg-gray-200 focus:bg-white transition"
      >
      <input
          v-model="password"
          type="password"
          name="password"
          placeholder="Пароль"
          class="outline-none p-2 rounded-xl bg-gray-200 focus:bg-white transition"
      >
      <ButtonLarge @click.prevent="login">Войти</ButtonLarge>
      <RouterLink :to="{name: 'registration'}">
        <TextLink class="text-blue-700">Регистрация</TextLink>
      </RouterLink>
    </Card>
  </div>
</template>

<script>


import axios from "axios";
import {SERVER_URL} from "@/utils/api.js";
import {useUserStore} from '@/utils/stores/UserStore'
import Card from "@/uikit/Card.vue";
import ButtonRound from "@/uikit/Buttons/ButtonRound.vue";
import ButtonLarge from "@/uikit/ButtonLarge.vue";
import TextLink from "@/uikit/TextLink.vue";

export default {
  components: {TextLink, ButtonLarge, ButtonRound, Card},
  data() {
    return {
      email: null,
      password: null,
      error: null,
      userStore: null,
    }
  },

  beforeMount() {
    this.userStore = useUserStore()
  },

  methods: {
    login() {
      this.userStore.login(this.email, this.password, (status, message) => {
        if (status === 'OK'){
          this.$router.push({name: 'profile'})
        }else{
          this.error = message
        }
      })
    }
  }
}
</script>

<style scoped>

.error{
  color: red;
}
</style>