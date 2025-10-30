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
  '**/src/index.ts',
  '**/src/main.ts',
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
  css: {
    postcss: './postcss.config.cjs',
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Unnnic',
      fileName: 'unnnic',
    },
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.ts'),
      },
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name;
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
