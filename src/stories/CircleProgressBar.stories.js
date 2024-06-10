import unnnicCircleProgressBar from '../components/CircleProgressBar/CircleProgressBar.vue';

export default {
  title: 'Progress/CircleProgressBar',
  component: unnnicCircleProgressBar,
  argTypes: {},
};

export const Default = {
  args: {
    progress: 4,
    totalProgress: 8,
  },
};
