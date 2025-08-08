import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'path';
import { glob } from 'glob';

const projectRootDir = path.resolve(__dirname);
const componentsDir = path.resolve(projectRootDir, 'src', 'components');

const componentEntries = glob.sync(`${componentsDir}/**/*.vue`)
  .map(file => {
    const componentName = path.basename(file, '.vue');
    return { [componentName]: file };
  })
  .reduce((acc, obj) => ({ ...acc, ...obj }), {});

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

export default defineConfig({
  build: {
    lib: {
      entry: {
        ...componentEntries,
        index: path.resolve(projectRootDir, 'src', 'index.ts'),
      },
      name: 'unnnic',
      fileName: (format, entryName) => {
        if (entryName === 'index') {
          return `unnnic.${format}.js`;
        }
        return `components/${entryName}/index.${format}.js`;
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outputDir: 'dist',
      copyDtsFiles: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts', 'src/**/*.stories.ts'],
      rollupTypes: true,
      staticImport: true,
    }),
  ],
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
      '@': path.resolve(projectRootDir, 'src'),
    },
  },
});
