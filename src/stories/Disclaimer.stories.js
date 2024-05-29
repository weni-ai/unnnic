import unnnicDisclaimer from '../components/Disclaimer/Disclaimer.vue';
import icons from '../utils/iconList';
import colors from '../utils/colorsList';

export default {
  title: 'Example/Disclaimer',
  component: unnnicDisclaimer,
  argTypes: {
    text: { control: { type: 'text' } },
    icon: { control: { type: 'select', options: icons } },
    iconColor: { control: { type: 'select', options: colors } },
  },
};

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicDisclaimer },
  template: '<unnnic-disclaimer v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  icon: 'alert-circle-1-1',
  iconColor: 'feedback-yellow',
};
