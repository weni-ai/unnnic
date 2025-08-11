import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';

const testExcludes = [
  '**/node_modules/**',
  '**/*.stories.js',
  '**/storybook-static/**',
  '**/assets/**',
  '**/.storybook/**',
  '**/src/App.vue',
  '**/src/index.js',
  '**/src/main.js',
  '**/src/utils/**',
  '.eslintrc.js',
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: [
        'src/**/*.stories.js',
        'src/**/__tests__/**',
        'src/**/*.spec.*',
      ],
      skipDiagnostics: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Unnnic',
      fileName: 'unnnic',
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.ts'),
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
      all: true,
      provider: 'istanbul',
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
