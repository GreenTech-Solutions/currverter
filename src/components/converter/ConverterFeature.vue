<script setup lang="ts">
  import { ICurrencyRate } from '@/types';
  import { ISelectItem, NumberControl, SelectControl } from '@components/ui';
  import { Currency } from '@enums';
  import { useServiceStore } from '@stores';
  import { getCurrenciesSelectItems } from '@utils';
  import { storeToRefs } from 'pinia';
  import { computed, onMounted, ref } from 'vue';

  interface IConverterValue {
    rate: number;
    currency: Currency;
  }

  const serviceStore = useServiceStore();

  const base = ref<IConverterValue>({ rate: 1, currency: Currency.USD });
  const target = ref<IConverterValue>({ rate: 1, currency: Currency.EUR });

  const { currentCurrency } = storeToRefs(serviceStore);

  const rates = ref<ICurrencyRate[]>([]);

  const currenciesSelectItems = getCurrenciesSelectItems();

  onMounted(async () => {
    rates.value = await serviceStore.getRates();

    base.value = { rate: 1, currency: currentCurrency.value };

    const targetRate = rates.value.find((item) => {
      return item.cBase === currentCurrency.value;
    });
    if (!targetRate) {
      throw new Error(`Can't find rate for ${currentCurrency.value}`);
    }

    target.value = { rate: Number(targetRate.rate.toFixed(2)), currency: targetRate.cTarget };
  });

  const baseSelectItems = computed<ISelectItem<Currency>[]>(() => {
    return currenciesSelectItems.filter((item) => item.value !== target.value.currency);
  });

  const targetSelectItems = computed<ISelectItem<Currency>[]>(() => {
    return currenciesSelectItems.filter((item) => item.value !== base.value.currency);
  });

  function onBaseChange() {
    const targetRate = rates.value.find((item) => {
      return item.cBase === base.value.currency && item.cTarget === target.value.currency;
    });
    if (!targetRate) {
      throw new Error(`Can't find rate for ${base.value.currency}`);
    }

    target.value.rate = Number((base.value.rate * targetRate.rate).toFixed(2));
  }

  function onTargetChange() {
    const baseRate = rates.value.find((item) => {
      return item.cBase === target.value.currency && item.cTarget === base.value.currency;
    });
    if (!baseRate) {
      throw new Error(`Can't find rate for ${target.value.currency}`);
    }

    base.value.rate = Number((target.value.rate * baseRate.rate).toFixed(2));
  }
</script>

<template>
  <div class="converter">
    <div class="converter__content">
      <div class="converter__control">
        <NumberControl v-model.number="base.rate" dot class="converter__input" @change="onBaseChange" />
        <SelectControl :items="baseSelectItems" v-model="base.currency" @change="onBaseChange" />
      </div>
      <div class="converter__control">
        <NumberControl v-model.number="target.rate" dot class="converter__input" @change="onTargetChange" />
        <SelectControl :items="targetSelectItems" v-model="target.currency" @change="onTargetChange" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .converter {
    &,
    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    &__control {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    &__input {
      height: 40px;
      background: transparent;
      border-top-color: transparent;
      border-left-color: transparent;
      border-right-color: transparent;
      border-bottom-color: black;

      &:focus {
        outline: none;
      }
    }
  }
</style>
