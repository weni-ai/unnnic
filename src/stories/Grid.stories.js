import Grid from '../components/grid/Grid.vue';

export default {
  title: 'Example/Grid',
  component: Grid,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl', 'giant'],
      },
    },
  },
};
export const grid = {
  args: {
    size: 'xs',
  },
};
