import UnnnicButtonClose from '../components/ButtonClose/ButtonClose.vue';

export default {
  title: 'Form/ButtonClose',
  component: UnnnicButtonClose,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: [
          'nano',
          'xs',
          'sm',
          'md',
          'lg',
          'avatar-lg',
          'avatar-md',
          'avatar-sm',
          'avatar-xs',
          'avatar-nano',
        ],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { UnnnicButtonClose },
  template: '<unnnic-button-close v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {};
