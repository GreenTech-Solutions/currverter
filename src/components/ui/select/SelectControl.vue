<script setup lang="ts" generic="T">
  import { onMounted, ref, watch } from 'vue';
  import type { ISelectItem } from '.';

  interface ISelectProps {
    items: ISelectItem<T>[];
    defaultIndex?: number;
  }

  interface ISelectEmits {
    (e: 'change', value: T): void;
  }

  const props = defineProps<ISelectProps>();

  const emits = defineEmits<ISelectEmits>();

  const selectedValue = defineModel();

  const selectedItem = ref<ISelectItem>();

  const isMenuOpened = ref<boolean>(false);

  onMounted(() => {
    if (selectedValue) {
      selectedItem.value = props.items.find((item) => item.value === selectedValue.value);
    }

    if (props.defaultIndex !== undefined && props.defaultIndex < props.items.length) {
      selectedItem.value = props.items[props.defaultIndex];
      emits('change', props.items[props.defaultIndex].value);
    }
  });

  watch(
    () => selectedValue.value,
    (newValue) => {
      selectedItem.value = props.items.find((item) => item.value === newValue);
    },
  );

  function onChange(option: ISelectItem) {
    selectedItem.value = option;
    selectedValue.value = option.value;
    emits('change', option.value);
  }

  function onSelectClick() {
    isMenuOpened.value = !isMenuOpened.value;
  }
</script>

<template>
  <div class="select" @click="onSelectClick">
    <div class="select__current">
      <div v-if="selectedItem" class="select__current-content">
        <component :is="selectedItem.icon" class="select__icon" />
        <span>{{ selectedItem?.label }}</span>
      </div>
      <div v-else>
        <span>Не выбрано</span>
      </div>
    </div>
    <div class="select__arrow" />

    <div class="select__dropdown" v-if="isMenuOpened">
      <div v-for="(option, index) in items" :key="index" @click="onChange(option)" class="select__item">
        <component :is="option.icon" class="select__icon" />
        <span class="select__label">{{ option.label }}</span>
        <div class="select__checkmark"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .select {
    position: relative;
    min-width: 150px;
    cursor: pointer;
    border: 1px solid transparent;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding: 15px;
    border-radius: 12px;
    width: 150px;

    &:hover {
      border-color: black;
      box-shadow: 0 1px 10px black;
    }

    &__current {
      display: flex;
      align-items: center;
      gap: 10px;

      &-content {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }

    &__option {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    &__dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: black;
      box-shadow: 0 1px 2px #0000001a;
      z-index: 10;

      display: flex;
      flex-direction: column;
      gap: 5px;
      border: 1px solid black;
      padding: 10px;
      border-radius: 12px;
    }

    &__item {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background-color: #00000000;
        scale: 1.05;
      }
    }

    &__icon {
      width: 16px;
      height: 16px;
    }

    &__arrow {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid white;
      transform: rotate(180deg);
    }
  }
</style>
