<script lang="ts" setup>
  import LogoImage from '@assets/images/logo.svg';
  import { PropType } from 'vue';
  import { Animate } from '@enums';

  const props: any = defineProps({
    animate: {
      type: String as PropType<Animate>,
      required: false,
      default: Animate.OnHover,
    },
  });
</script>

<template>
  <LogoImage :class="`logo ${props.animate}`" />
</template>

<style lang="scss" scoped>
  .logo {
    width: 150px;

    padding: 0 10px;

    :deep(.rotating) {
      transition: 3s;
      transform-origin: 170px 102.025px;

      animation: rotate 5s linear infinite;
      animation-play-state: paused;
    }

    &.always {
      & :deep(.rotating) {
        animation-play-state: running;
      }
    }

    &.onHover {
      &:hover :deep(.rotating) {
        animation-play-state: running;
      }
    }
  }

  @keyframes rotate {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 360deg;
    }
  }
</style>
