<template>
  <div class="relative">
    <UserIcon @click="openMenu" class="cursor-pointer" :img="userStore?.user?.img" size="46px" />

    <div v-if="isOpenMenu" class="bg-[white] w-[300px] absolute z-30 top-0 right-0 p-[10px] shadow-2xl" @click.stop="">

      <ul>
        <li class="menu-item">
          <RouterLink :to="{name: 'profile'}" @click.prevent="closeMenu">
            <div class="flex gap-3">
              <!-- Avatar -->
              <UserIcon class="cursor-pointer" :img="userStore?.user?.img" />
              <!-- End Avatar -->

              <!-- Name -->
              <div class="flex flex-col">
                <span class="font-bold">{{`${userStore?.user?.name} ${userStore?.user?.surname}`}}</span>
                <span class="text-slate-500 text-[13px]">{{userStore?.user?.email}}</span>
              </div>
              <!-- End Name -->

            </div>
          </RouterLink>
        </li>

        <!-- Orders -->
        <li class="menu-item">
          <RouterLink :to="{name: 'orders'}" @click.prevent="closeMenu">
            <div class="flex">
              <img class="menu-icon" src="/img/box.svg">
              <span class="ml-5">Заказы</span>
            </div>
          </RouterLink>
        </li>
        <!-- End Orders -->

        <!-- Basket -->
        <li class="menu-item">
          <RouterLink :to="{name: 'basket'}" @click.prevent="closeMenu">
            <div class="flex">
              <img class="menu-icon" src="/img/basket.svg">
              <span class="ml-5">Корзина</span>
              <span class="ml-2 text-slate-400">{{(Object.keys(userStore?.basket).length > 0) ? Object.keys(userStore?.basket).length : ''}}</span>
            </div>
          </RouterLink>
        </li>
        <!-- End Basket -->

        <!-- Favorites -->
        <li class="menu-item">
          <RouterLink :to="{name: 'favorites'}" @click.prevent="closeMenu">
            <div class="flex">
              <img class="menu-icon" src="/img/favorites.svg">
              <span class="ml-5">Избранное</span>
              <span class="ml-2 text-slate-400">{{(userStore.favorites.length > 0) ? userStore.favorites.length : ''}}</span>
            </div>
          </RouterLink>
        </li>
        <!-- End Favorites -->

        <!-- Shops -->
        <li class="menu-item">
          <div class="flex">
            <img class="menu-icon" src="/img/shop.svg">
            <span class="ml-5">Мои магазины</span>
          </div>
        </li>
        <!-- End Shops -->

        <!-- Logout -->
        <li class="menu-item">
          <div @click.prevent="logOut">
            <div class="flex">
              <img class="menu-icon" src="/img/logout.svg">
              <span class="ml-5">Выйти</span>
            </div>
          </div>
        </li>
        <!-- End Logout -->
      </ul>

    </div>
  </div>
  <div v-if="isOpenMenu" class="w-[100vw] h-[100vh] absolute top-0 left-0 z-20" @click.stop="closeMenu"/>
</template>

<script>
import API, {SERVER_URL} from "@/utils/api.js";
import {useUserStore} from '@/utils/stores/UserStore'
import UserIcon from "@/uikit/UserIcon.vue";

export default {
  components: {UserIcon},

  data() {
    return {
      isOpenMenu: false,
      userStore: null,
    }
  },

  beforeMount() {
    this.userStore = useUserStore()
  },

  methods: {
    openMenu(){
      this.isOpenMenu = true
    },
    closeMenu(){
      this.isOpenMenu = false
    },

    logOut() {
      this.closeMenu()
      this.userStore.logout(() => {
        this.$router.push({name: 'login'})
      })
    },
  },
}
</script>

<style scoped>

.menu-item{
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  transition: .3s;
}

.menu-item:hover{
  background: #eeeeee;
}

.menu-icon{
  width: 25px;
  height: 25px;
}

</style>