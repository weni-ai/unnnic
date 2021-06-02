import unnnicIconSvg from '../components/Icon-svg.vue';
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
  'neutral-clean',
  'neutral-cleanest',
  'neutral-dark',
  'neutral-soft',
  'neutral-darkest',
];

export default {
  title: 'example/IconSvg',
  component: unnnicIconSvg,
  argTypes: {
    icon: { control: { type: 'select', options: iconsOptions } },
    scheme: { control: { type: 'select', options: schemes } },
    size: { control: { type: 'select', options: ['nano', 'xs', 'sm', 'md', 'lg'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicIconSvg },
  template: `
    <unnnic-icon-svg v-bind="$props" />
  `,
});

export const Normal = Template.bind({});

Normal.args = {
  icon: iconsOptions[0],
};
