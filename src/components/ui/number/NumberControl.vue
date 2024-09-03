<script setup lang="ts">
  import type { INumberControlOptions } from './types';

  interface INumberControlProps extends INumberControlOptions {}

  interface INumberControlEmits {
    (e: 'enter'): void;
    (e: 'change'): void;
  }

  const props = withDefaults(defineProps<INumberControlProps>(), {
    dot: false,
    zeros: false,
  });

  const emits = defineEmits<INumberControlEmits>();

  const data = defineModel<number | undefined>({
    set(value) {
      if ((value as any) === '') return Number(value) ?? 0;
      return value;
    },
  });

  function onChange(event: Event): void {
    if (!event.target) return;

    const value: any = (event.target as HTMLInputElement).value;

    if (!props.zeros && value[0] === '0' && value[1] !== '.') {
      data.value = value - 0;
      event.preventDefault();
    } else data.value = value;

    emits('change');
  }

  function onKeyPress(event: KeyboardEvent): void {
    const value = (event.target as HTMLInputElement).value;
    const cursorPosition = (event.target as HTMLInputElement).selectionStart;
    const hasExcessZero = event.key === '0' && (value === '0' || (value.length && cursorPosition === 0));

    const isDotValid = props.dot && event.key === '.' && !value.includes('.');

    if ((/^\d+$/.test(event.key) && (props.zeros || !hasExcessZero)) || isDotValid) return;
    event.preventDefault();
  }

  function onFocus(event: FocusEvent): void {
    if (!event.target) return;
    (event.target as HTMLInputElement).select();
  }

  function onEnterPressed(event: KeyboardEvent): void {
    emits('enter');
    (event.target as HTMLInputElement).blur();
  }
</script>

<template>
  <input
    class="number"
    v-model.number.lazy="data"
    @keypress="onKeyPress"
    @input="onChange"
    @keydown.enter="onEnterPressed"
    @focus="onFocus"
    v-bind="{ ...$attrs, type: 'text' }" />
</template>

<style lang="scss" scoped></style>
