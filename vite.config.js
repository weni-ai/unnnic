import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const testExcludes = [
  '**/node_modules/**',
  '**/*.stories.js',
  '**/storybook-static/**',
  '**/assets/**',
  '**/.storybook/**',
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Unnnic',
      fileName: 'unnnic',
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.js'),
      },
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      exclude: testExcludes,
      reporter: ['text', 'json', 'html'],
    },
    exclude: testExcludes,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
