<template>
  <div class="mt-auto">
    <!-- Space -->
    <div class="h-[50px]" />
    <!-- End Space -->

    <!-- Footer 1 -->
    <div class="flex justify-center bg-gray-100 py-5">
      <div class="w-[70%]">
        <div class="grid grid-cols-4">
          <div class="flex flex-col gap-3">
            <h1 class="font-medium">Покупателям</h1>
            <div class="flex flex-col gap-1">
              <span class="link">Как выбрать товар</span>
              <span class="link">Оплата и доставка</span>
              <span class="link">Обратная связь</span>
              <span class="link">Покупайте как юрлицо</span>
              <span class="link">О сервисе</span>
              <span class="link">Участие в исследованиях</span>
              <span class="link">Возвраты</span>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <h1 class="font-medium">Продавцам</h1>
            <div class="flex flex-col gap-1">
              <span class="link">Личный кабинет продавца</span>
              <span class="link">Продавайте на Маркете</span>
              <span class="link">Документация для партнёров</span>
              <span class="link">Сайт для партнёров</span>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <h1 class="font-medium">Сотрудничество</h1>
            <div class="flex flex-col gap-1">
              <span class="link">Новости компании</span>
              <span class="link">Партнёрская программа</span>
              <span class="link">Программа для блогеров</span>
              <span class="link">Производителям</span>
              <span class="link">Пункт выдачи заказов</span>
              <span class="link">Маркет нанимает</span>
            </div>
          </div>
          <div class="flex flex-col gap-5 ">
            <div class="flex items-center gap-3 cursor-pointer">
              <img class="w-[36px] h-[36px]" src="/img/sovetnik-icon.svg">
              <span class="text-[15px] font-medium text-[#404040]">Советник находит нужные вам товары по более выгодной цене. <span class="text-blue-700">Подробнее</span></span>
            </div>
            <span class="text-[13px] text-slate-500">584 265 791 предложение от 53 351 магазина.
Обновлено 10.01.2024 в 15:13 по московскому времени.</span>
          </div>
        </div>
      </div>
    </div>
    <!-- End Footer 1 -->

    <!-- Footer 2 -->
    <div class="flex px-10 py-5 bg-gray-200 items-center text-[13px] text-slate-500">
      <div class="flex gap-5">
        <TextLink>Статистика</TextLink>
        <TextLink>Пользовательское соглашение</TextLink>
      </div>
      <div class="flex-1"/>
      <div class="flex flex-col gap-1 text-end">
        <span>© 2024  ООО «<TextLink>ЯНДЕКС</TextLink>»</span>
        <span>Проект компании <TextLink>ЯНДЕКС</TextLink></span>
      </div>
    </div>
    <!-- End Footer 2 -->
  </div>
</template>

<script>
import TextLink from "@/uikit/TextLink.vue";

export default {
  components: {TextLink}
}
</script>

<style scoped>
.link{
  font-size: 13px;
  color: #525252;
  cursor: pointer;
}
.link:hover{
  color: #fc3d3d;
}
</style>