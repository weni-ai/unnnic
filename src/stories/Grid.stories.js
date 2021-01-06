import Grid from '../components/grid/Grid.vue';

export default {
  title: 'Example/Grid',
  component: Grid,
  argTypes: {
    size: { control: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', 'giant'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Grid },
  template: '<grid v-bind="$props" />',
});

export const grid = Template.bind({});
grid.args = {
  size: 'xs',
};
