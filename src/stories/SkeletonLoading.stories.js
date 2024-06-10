import UnnnicSkeletonLoading from '../components/SkeletonLoading/SkeletonLoading.vue';

export default {
  title: 'example/Skeleton',
  component: UnnnicSkeletonLoading,
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

export const Default = {
  args: {
    width: '500px',
    height: '200px',
    prefix: 'unnnic',
    tag: 'span',
    duration: 1.5,
    count: 1,
    circle: false,
    loading: true,
  },
};
