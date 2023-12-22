import unnnicCheckbox from '../components/Checkbox/Checkbox.vue';

export default {
  title: 'Form/Checkbox',
  component: unnnicCheckbox,
  argTypes: {
    value: { control: 'inline-radio', options: [true, false, 'less'] },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['md', 'sm'] },
  },
};

export const Default = {
  args: {
    value: true,
    disabled: false,
    size: 'md',
  },
};
