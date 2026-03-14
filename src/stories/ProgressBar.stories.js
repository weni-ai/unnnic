import { action } from 'storybook/actions';
import UnnnicProgressBar from '../components/ProgressBar/ProgressBar.vue';

export default {
  title: 'Progress/ProgressBar',
  component: UnnnicProgressBar,
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary'],
    },
  },
  args: {
    modelValue: 25,
    title: 'Title name',
    onClose: action('close'),
  },
};
export const Primary = {};

export const Secondary = { args: { type: 'secondary' } };

export const Inline = {
  args: {
    inline: true,
  },
};

export const Subtitle = { args: { subtitle: 'Subtitle or description' } };

export const SubtitleCanClose = {
  args: {
    subtitle: 'Subtitle or description',
    canClose: true,
  },
};
