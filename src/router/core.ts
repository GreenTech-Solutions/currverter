import { createRouter, createWebHistory } from 'vue-router';
import { Routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: Routes.MAIN,
      component: () => import('@pages/MainPage.vue'),
    },
    {
      path: '/converter',
      name: Routes.CONVERTER,
      component: () => import('@pages/ConverterPage.vue'),
    },
  ],
});

export default router;
