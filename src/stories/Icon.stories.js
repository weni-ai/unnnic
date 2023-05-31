import unnnicIcon from '../components/Icon.vue';
import icons from '../utils/icons';

const iconsOptions = Object.keys(icons);

const schemes = [
  'feedback-red',
  'feedback-green',
  'feedback-yellow',
  'feedback-blue',
  'feedback-grey',
  'aux-blue',
  'aux-purple',
  'aux-orange',
  'aux-lemon',
  'aux-pink',
  'brand-weni',
  'brand-weni-soft',
  'neutral-clean',
  'neutral-cleanest',
  'neutral-dark',
  'neutral-soft',
  'neutral-darkest',
];

export default {
  title: 'example/Icon',
  component: unnnicIcon,
  argTypes: {
    icon: { control: { type: 'select', options: iconsOptions } },
    scheme: { control: { type: 'select', options: schemes } },
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
  components: { unnnicIcon },
  template: `
    <unnnic-icon v-bind="$props" />
  `,
});

export const Normal = Template.bind({});

Normal.args = {
  icon: iconsOptions[0],
};
