import unnnicInput from '../components/Input/Input.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Example/Input',
  component: unnnicInput,
  argTypes: {
    size: { control: { type: 'select', options: ['md', 'sm'] } },
    type: { control: { type: 'select', options: ['normal', 'error'] } },
    nativeType: { control: { type: 'select', options: ['input', 'password'] } },
    placeholder: { control: { type: 'text' } },
    iconLeft: { control: { type: 'select', options: iconList } },
    iconRight: { control: { type: 'select', options: iconList } },
    tooltipIconRight: { control: { type: 'text' } },
    tooltipSideIconRight: { control: { type: 'select', options: ['top', 'right', 'bottom', 'left'] } },
    tooltipForceOpenIconRight: { control: { type: 'boolean' } },
    allowTogglePassword: { control: { type: 'select', options: [true, false] } },
    hasCloudyColor: { control: { type: 'select', options: [true, false] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicInput },
  template: '<unnnic-input v-bind="$props" />',
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
