<template>
  <div class="flex justify-center items-center w-[100%] h-[50vh]">
    <Card class="flex flex-col gap-3 w-[40%] shadow-2xl">
      <div class="flex gap-3">
        <UserIcon
            :img="userStore.user?.img"
            size="100px"
        />
        <div class="flex flex-col flex-1 justify-center">
          <span class="text-[30px] font-medium">{{userStore.user?.name}} {{userStore.user?.surname}}</span>
          <span class="text-[20px]">{{userStore.user?.email}}</span>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="flex gap-1">
          <span class="text-gray-600">Адрес доставки:</span>
          <span class="">{{userStore.user?.address}}</span>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import {useUserStore} from '@/utils/stores/UserStore'
import Card from "@/uikit/Card.vue";
import UserIcon from "@/uikit/UserIcon.vue";

export default {
  components: {UserIcon, Card},
  data() {
    return {
      userStore: null,
      secret_data: null,
    }
  },

  beforeMount() {
    this.userStore = useUserStore()
  },

  mounted() {

  },
}
</script>

<style lang="scss" scoped>

</style>