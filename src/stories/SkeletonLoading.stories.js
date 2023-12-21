import unnnicSkeletonLoading from '../components/SkeletonLoading/SkeletonLoading.vue';

export default {
  title: 'example/Skeleton',
  component: unnnicSkeletonLoading,
  argTypes: {
    width: { control: { type: 'text' } },
    height: { control: { type: 'text' } },
    loading: { control: { type: 'boolean' } },
    prefix: { control: { type: 'text' } },
    tag: { control: { type: 'text' } },
    circle: { control: { type: 'boolean' } },
    duration: { control: { type: 'number' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).concat(['input']),
  components: {
    unnnicSkeletonLoading,
  },
  data() {
    return {
      insideValue: 'option 1',
    };
  },
  template: `
    <div>
      <h3>Default</h3>
      <unnnic-skeleton-loading  v-bind="$props" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  width: '500px',
  height: '200px',
  prefix: 'unnnic',
  tag: 'span',
  duration: 1.5,
  count: 1,
  circle: false,
  loading: true,
};
