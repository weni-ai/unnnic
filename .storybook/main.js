import remarkGfm from 'remark-gfm';

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import('vite');
    const plugins = viteConfig.plugins.filter((plugin) => {
      const name =
        plugin?.name ?? (Array.isArray(plugin) ? plugin[0]?.name : null);
      return name !== 'vite-plugin-dts' && name !== 'vite:dts';
    });
    return mergeConfig(viteConfig, { plugins });
  },
};
export default config;
