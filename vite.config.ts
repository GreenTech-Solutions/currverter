import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages/', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components/', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router/', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types/', import.meta.url)),
      '@enums': fileURLToPath(new URL('./src/enums/', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets/', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api/', import.meta.url)),
      '@icons': fileURLToPath(new URL('./src/assets/icons/', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils/', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores/', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@assets/styles/variables.scss";',
      },
    },
  },
});
