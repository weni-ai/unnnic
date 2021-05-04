import unnnicSkeletonLoading from '../components/SkeletonLoading/SkeletonLoading.vue';

export default {
  title: 'example/Skeleton',
  component: unnnicSkeletonLoading,
  argTypes: {
    width: { control: { type: 'text' } },
    height: { control: { type: 'text' } },
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
      <unnnic-skeletonLoading  v-bind="$props" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  width: '1024px',
  height: '300px',
};
