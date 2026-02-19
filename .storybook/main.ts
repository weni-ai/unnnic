import { createRequire } from 'node:module';
import remarkGfm from 'remark-gfm';
import type { StorybookConfig } from '@storybook/vue3-vite';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
            // Resolve to absolute path so Vite can resolve the module (avoids file:// URL resolution issues on Windows)
            providerImportSource: require.resolve(
              '@storybook/addon-docs/mdx-react-shim',
            ),
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
};
export default config;
