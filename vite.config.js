import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: path.resolve(
        __dirname,
        './node_modules/vue/dist/vue.runtime.esm-bundler.js',
      ),
    },
  },
  build: {
    target: 'chrome89',
  },
  base: 'http://localhost:3003',
  plugins: [
    federation({
      filename: 'remoteEntry.js',
      name: 'remote',
      exposes: {
        './BaseStyles': './src/assets/scss/unnnic.scss',
        './TextArea': './src/components/TextArea/TextArea.vue',
      },
      shared: {
        ...dependencies,
        vue: {
          singleton: true,
          requiredVersion: dependencies.vue,
        },
      },
      remotes: {},
    }),
    vue(),
    vueJsx(),
  ],
});
