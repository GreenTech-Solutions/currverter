<script lang="ts" setup>
  import { Logo, SelectControl } from '@components/ui';
  import { Currency } from '@enums';
  import { Routes } from '@router';
  import { useServiceStore } from '@stores';
  import { getCurrenciesSelectItems } from '@utils';
  import { storeToRefs } from 'pinia';

  const serviceStore = useServiceStore();
  const { currentCurrency } = storeToRefs(serviceStore);

  function onCurrencyChange(value: Currency) {
    serviceStore.currentCurrency = value;
  }
</script>

<template>
  <header class="header">
    <Logo class="header__logo" />
    <nav class="header__nav">
      <RouterLink :to="{ name: Routes.MAIN }" class="header__link">Главная</RouterLink>
      <RouterLink :to="{ name: Routes.CONVERTER }" class="header__link">Конвертация</RouterLink>
      <SelectControl
        :items="getCurrenciesSelectItems()"
        v-model="currentCurrency"
        :default-index="0"
        @change="onCurrencyChange"
        class="header__select" />
    </nav>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    gap: 100px;

    &__nav {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    &__link,
    &__select {
      font-size: 24px;
      transition: 0.3s;
      padding: 10px 20px;
      border-radius: 12px;
      border: 1px solid;
      border-color: transparent;
    }

    &__link {
      color: #646cff;

      &:hover {
        color: rgb(144, 77, 199);
        cursor: pointer;
        transform: scale(1.1);
        filter: drop-shadow(0 0 5px rgb(144, 77, 199, 0.5));
        border-color: rgb(161, 122, 194);
      }

      &:active {
        transform: scale(0.99);
        filter: drop-shadow(0 0 5px rgb(144, 77, 199, 0.5));
        border-color: rgb(161, 122, 194);
        position: relative;
        top: 1px;
      }
    }

    &__select {
      font-size: 16px;
      outline: none;
    }
  }
</style>
