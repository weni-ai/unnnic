import UnnnicDisclaimer from '../components/Disclaimer/Disclaimer.vue';
import icons from '../utils/iconList';
import colors from '../utils/colorsList';

export default {
  title: 'Example/Disclaimer',
  component: UnnnicDisclaimer,
  args: {},
  argTypes: {
    text: { control: { type: 'text' } },
    icon: { options: icons, control: { type: 'select' } },
    iconColor: { options: colors, control: { type: 'select' } },
  },
};

export const Default = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: 'alert-circle-1-1',
    iconColor: 'feedback-yellow',
  },
};
