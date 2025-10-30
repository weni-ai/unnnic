const {
  defineConfigWithVueTs,
  vueTsConfigs,
} = require('@vue/eslint-config-typescript');
const pluginVue = require('eslint-plugin-vue');
// @ts-expect-error - weniConfig is not typed
const weniConfig = require('@weni/eslint-config/vue3.js');

module.exports = defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['src/**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['src/locales/**', 'node_modules/'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  weniConfig,
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'import/extensions': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-restricted-types': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-wrapper-object-types': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      'vue/multi-word-component-names': 'warn',
      'vue/block-lang': 'warn',
      'vue/no-deprecated-model-definition': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
    },
  },
  {
    files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
    rules: {
      '@typescript-eslint/no-shadow': 'off',
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['src/assets/icons/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['eslint.config.js', 'postcss.config.cjs'],
    env: {
      node: true,
    },
  },
);
