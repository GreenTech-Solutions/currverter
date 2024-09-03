<script lang="ts" setup>
  import { Logo } from '@components/ui';
  import { Animate } from '@enums';
</script>

<template>
  <div class="preloader">
    <Logo :animate="Animate.Always" />
  </div>
</template>

<style lang="scss" scoped>
  .preloader {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $mainBackgroundColor;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
