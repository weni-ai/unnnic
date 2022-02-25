import { addDecorator } from '@storybook/vue';
import i18n from '../src/utils/plugins/i18n';

addDecorator(() => ({
  i18n,
  template: '<story/>',
}));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
