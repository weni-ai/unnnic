import UnnnicCircleProgressBar from '../components/CircleProgressBar/CircleProgressBar.vue';

export default {
  title: 'Progress/CircleProgressBar',
  component: UnnnicCircleProgressBar,
  tags: ['autodocs'],
  argTypes: {},
};

export const Default = {
  args: {
    progress: 4,
    totalProgress: 8,
  },
};
