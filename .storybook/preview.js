import React, { useState, useEffect } from 'react';
import { DocsContainer } from '@storybook/blocks';

import { setup } from '@storybook/vue3';
import { withThemeByClassName } from '@storybook/addon-themes';
import { themes } from '@storybook/theming';

import i18n from '../src/utils/plugins/i18n';
import DocsTemplate from './DocsTemplate.mdx';
import '../src/assets/scss/tailwind.scss';

const ThemedDocsContainer = (props) => {
  const storeGlobals = props.context.store?.userGlobals?.globals || props.context.store?.globals?.globals || {};
  const initialTheme = storeGlobals.theme || 'light';
  
  const [isDark, setIsDark] = useState(initialTheme === 'dark');

  useEffect(() => {
    const channel = props.context.channel;

    const handleGlobalsUpdated = (eventData) => {
      const newTheme = eventData?.globals?.theme;
      if (newTheme) {
        setIsDark(newTheme === 'dark');
      }
    };

    channel.on('GLOBALS_UPDATED', handleGlobalsUpdated);
    
    return () => {
      channel.off('GLOBALS_UPDATED', handleGlobalsUpdated);
    };
  }, [props.context.channel]);

  return React.createElement(
    DocsContainer,
    { ...props, theme: isDark ? themes.dark : themes.light },
    props.children
  );
};

export default {
  parameters: {
    docs: {
      page: DocsTemplate,
      toc: true,
      container: ThemedDocsContainer,
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '', 
        dark: 'dark',
      },
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
  ],
};

setup((app) => {
  app.use(i18n);
});
