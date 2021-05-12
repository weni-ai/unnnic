import unnnicCarousel from '../components/Carousel/Carousel.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Example/Carousel',
  component: unnnicCarousel,
  argTypes: {
    type: { control: { type: 'select', options: ['brand'] } },
    icon: { control: { type: 'select', options: iconList } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicCarousel },
  template: '<unnnic-carousel v-bind="$props"/>',
});

export const Tag = Template.bind({});
Tag.args = {
  type: 'brand',
  tagItems: [
    { id: 1, name: 'tag - 1' },
    { id: 2, name: 'tag - 2' },
    { id: 3, name: 'tag - 3' },
    { id: 4, name: 'tag - 4' },
    { id: 5, name: 'tag - 5' },
    { id: 6, name: 'tag - 6' },
    { id: 7, name: 'tag - 7' },
    { id: 8, name: 'tag - 8' },
    { id: 9, name: 'tag - 9' },
    { id: 10, name: 'tag - 10' },
    { id: 11, name: 'tag - 11' },
    { id: 12, name: 'tag - 12' },
  ],
};
