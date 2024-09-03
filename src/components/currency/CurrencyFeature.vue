<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { getRates } from '@api';
  import { ICurrencyRate } from '@types';
  import { useServiceStore } from '@stores';
  import { getCurrencyIcon } from '@utils';

  const serviceStore = useServiceStore();

  const result = ref<ICurrencyRate[]>([]);

  onMounted(async () => {
    result.value = await serviceStore.getRates();
  });

  const rates = computed<ICurrencyRate[]>(() => {
    return result.value.filter((rate) => rate.cTarget === serviceStore.currentCurrency);
  });
</script>

<template>
  <div class="currencies">
    <div class="currencies__list">
      <div v-for="(item, index) in rates" :key="index" class="currencies__item">
        <span class="currencies__value">
          1&nbsp;<span class="currencies__ticker">
            <component :is="getCurrencyIcon(item.cBase)" class="icon" />
            {{ item.cBase }}
          </span>
        </span>
        &nbsp;=&nbsp;
        <span class="currencies__value">
          <span class="currencies__rate">{{ item.rate.toFixed(2) }}</span>
          &nbsp;<span class="currencies__ticker">
            <component :is="getCurrencyIcon(item.cTarget)" class="icon" />
            {{ item.cTarget }}</span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .currencies {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 10px;
    }

    &__value {
      display: flex;
      align-items: center;
    }

    &__ticker {
      font-size: 14px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    &__rate {
      font-size: 18px;
    }
  }
</style>
