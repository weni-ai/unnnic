import unnnicAutocomplete from '../components/Input/Autocomplete.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Example/Autocomplete',
  component: unnnicAutocomplete,
  argTypes: {
    type: { control: { type: 'select', options: ['normal', 'error'] } },
    size: { control: { type: 'select', options: ['md', 'sm'] } },
    placeholder: { control: { type: 'text' } },
    iconLeft: { control: { type: 'select', options: iconList } },
    iconRight: { control: { type: 'select', options: iconList } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicAutocomplete },
  template: '<unnnic-autocomplete v-bind="$props" :data="[\'option 1\', {type: \'category\', text: \'Artificial Intelligence\'}, \'option 2\', \'option 3\', {type: \'category\', text: \'Flows\'}, \'option 4\', \'option 5\']" />',
});

export const Normal = Template.bind({});
Normal.args = {
  type: 'normal',
  placeholder: 'Placeholder',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  placeholder: 'Placeholder',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: 'Placeholder',
};
