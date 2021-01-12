import unnicLanguageSelect from '../components/Dropdown/LanguageSelect.vue';

export default {
  title: 'example/LanguageSelect',
  component: unnicLanguageSelect,
  argTypes: {
    value: { control: { type: 'select', options: ['pt-br', 'en'] } },
    position: { control: { type: 'select', options: ['top', 'bottom', 'right', 'left'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnicLanguageSelect },
  template: '<unnic-language-select v-bind="$props" />',
});

export const Normal = Template.bind({});
Normal.args = {
  value: 'pt-br',
};

export const Contracted = Template.bind({});
Contracted.args = {
  value: 'pt-br',
  contracted: true,
};
