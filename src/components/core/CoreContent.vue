<script lang="ts" setup>
  import { Header } from '.';
</script>

<template>
  <div class="content">
    <Header />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .content {
    position: relative;
    z-index: 2;
    height: 100vh;
    overflow: auto;
    scrollbar-width: none;
    padding: 20px 100px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
