<template>
  <div class="flex justify-center mt-[100px]">
    <Card class="flex flex-col gap-[20px]">
      <h1 class="text-[20px] font-medium">Регистрация</h1>
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
      <input
          v-model="password_repeat"
          type="password"
          name="password_repeat"
          placeholder="Повтор пароля"
          class="outline-none p-2 rounded-xl bg-gray-200 focus:bg-white transition"
      >
      <ButtonLarge @click.prevent="registration">Зарегистрироваться</ButtonLarge>
      <RouterLink :to="{name: 'login'}">
        <TextLink class="text-blue-700">Авторизация</TextLink>
      </RouterLink>
    </Card>
  </div>
</template>

<script>
import Card from "@/uikit/Card.vue";
import ButtonLarge from "@/uikit/ButtonLarge.vue";
import TextLink from "@/uikit/TextLink.vue";

export default {
  components: {TextLink, ButtonLarge, Card},
  data() {
    return {
      email: null,
      password: null,
      password_repeat: null,
      error: null,
    }
  },

  mounted() {

  },

  methods: {
    registration(){
      console.log('registration')
    },
  }
}
</script>

<style scoped>
.form{
  display: flex;
  justify-content: center;
}
</style>