<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import type { EventHandler } from '@types';
  import { Ref, ref } from 'vue';
  import { Content, Preloader } from '@components/core';

  const isLoaded: Ref<boolean> = ref(false);

  const draggableDiv = ref<HTMLDivElement>();

  const onMouseMove: EventHandler<MouseEvent> = (e: MouseEvent) => {
    if (draggableDiv.value) {
      draggableDiv.value.style.left = e.clientX + 'px';
      draggableDiv.value.style.top = e.clientY + 'px';
    }
  };

  const onMouseLeave: EventHandler<MouseEvent> = () => {
    if (draggableDiv.value) {
      draggableDiv.value.style.opacity = '0';
      draggableDiv.value.style.transform = 'scale(0)';
    }
  };

  const onMouseEnter: EventHandler<MouseEvent> = () => {
    if (draggableDiv.value) {
      draggableDiv.value.style.opacity = '1';
      draggableDiv.value.style.transform = 'scale(1)';
    }
  };

  window.addEventListener('load', function onLoad() {
    setTimeout(() => {
      isLoaded.value = true;
    }, 400);
    window.removeEventListener('load', onLoad);
  });
</script>

<template>
  <div class="wrapper" @mousemove="onMouseMove" @mouseleave="onMouseLeave" @mouseenter="onMouseEnter">
    <Content>
      <RouterView class="router" v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </Content>

    <div class="drag-effect" ref="draggableDiv" />

    <transition>
      <Preloader v-if="!isLoaded" />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .router {
    width: auto;
  }

  .drag-effect {
    position: absolute;
    width: 50vw;
    height: 50vw;
    border-radius: 50%;
    translate: -50% -50%;
    pointer-events: none;
    left: 50%;
    transition:
      opacity 0.3s,
      transform 0.5s;

    background: radial-gradient(circle at center, #8585e035 0%, transparent 50%) no-repeat;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.1s ease-out;
  }

  .slide-fade-enter-from {
    opacity: 0;
  }
  .slide-fade-leave-to {
    opacity: 0;
  }
</style>
