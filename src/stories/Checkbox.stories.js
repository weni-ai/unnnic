import unnnicCheckbox from '../components/Checkbox/Checkbox.vue';

export default {
  title: 'Form/Checkbox',
  component: unnnicCheckbox,
  argTypes: {
    value: { control: { type: 'inline-radio', options: [true, false, 'less'] } },
    disabled: { control: { type: 'boolean' } },
    size: { control: { type: 'select', options: ['md', 'sm'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).concat(['input']),
  components: {
    unnnicCheckbox,
  },
  template: `
    <unnnic-checkbox v-bind="$props"></unnnic-checkbox>
  `,
});

export const Default = Template.bind({});
Default.args = {
  value: true,
  disabled: false,
  size: 'md',
};
