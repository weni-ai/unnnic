import UnnnicLanguageSelect from '../components/Dropdown/LanguageSelect.vue';

export default {
  title: 'example/LanguageSelect',
  component: UnnnicLanguageSelect,
  argTypes: {
    value: { control: { type: 'select', options: ['pt-br', 'en'] } },
    position: {
      control: { type: 'select', options: ['top', 'bottom', 'right', 'left'] },
    },
  },
};

export const Normal = {
  args: {
    value: 'pt-br',
    position: 'bottom',
  },
};

export const Contracted = {
  args: {
    value: 'pt-br',
    contracted: true,
  },
};
