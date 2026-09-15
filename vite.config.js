import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

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

function collectCssFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      collectCssFiles(fullPath, files);
    } else if (entry.endsWith('.css') && entry !== 'style.css') {
      files.push(fullPath);
    }
  }
  return files;
}

/** Concatenate all emitted CSS into dist/style.css for backwards compatibility. */
function legacyStyleCss() {
  return {
    name: 'unnnic-legacy-style-css',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist');
      try {
        const cssFiles = collectCssFiles(distDir).sort();
        if (!cssFiles.length) return;
        const combined = cssFiles
          .map((file) => readFileSync(file, 'utf8'))
          .join('\n');
        writeFileSync(join(distDir, 'style.css'), combined);
        console.log(
          `✓ wrote dist/style.css (${cssFiles.length} CSS files concatenated)`,
        );
      } catch (error) {
        console.warn('Could not generate dist/style.css:', error.message);
      }
    },
  };
}

const assetFileNames = (assetInfo) => {
  if (assetInfo.name === 'style.css' || assetInfo.name === 'index.css') {
    return 'style.css';
  }
  return assetInfo.name;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    libInjectCss(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      tsconfigPath: './tsconfig.json',
      include: ['src/**/*'],
      exclude: [
        'src/**/*.stories.js',
        'src/**/__tests__/**',
        'src/**/*.spec.*',
      ],
      skipDiagnostics: true,
    }),
    legacyStyleCss(),
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
      formats: ['es', 'umd'],
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs',
          assetFileNames,
        },
        {
          format: 'umd',
          name: 'Unnnic',
          globals: {
            vue: 'Vue',
          },
          assetFileNames,
        },
      ],
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
