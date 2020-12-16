import Button from '../components/Button/Button.vue';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    type: { control: { type: 'select', options: ['normal', 'hover', 'disable'] } },
    nativeType: {
      control: {
        type: 'select',
        options: [
          'ButtonNormal',
          'ButtonWithIconLeft',
          'ButtonWithIconRight',
          'ButtonWithIconCenter',
          'ButtonNormalTertiary',
          'ButtonTertiaryWithIconLeft',
          'ButtonTertiaryWithIconRight',
          'ButtonTertiaryWithIconCenter',
          'ButtonNormalSmall',
          'ButtonTertiaryWithIconLeftSmall',
          'ButtonTertiaryWithIconRightSmall',
          'ButtonNormalTertiarySmall',
          'ButtonTertiaryWithIconCenterSmall',
          'ButtonWithIconCenterSmall',
          'ButtonWithIconLeftSmall',
          'ButtonWithIconRightSmall',
        ],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button v-bind="$props" />',
});

export const Normal = Template.bind({});
Normal.args = {
  type: 'ButtonNormal',
};
