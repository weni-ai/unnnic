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
    { id: 1, name: 'tag' },
    { id: 2, name: 'tag' },
    { id: 3, name: 'tag' },
    { id: 4, name: 'tag' },
    { id: 5, name: 'tag' },
    { id: 6, name: 'tag' },
    { id: 7, name: 'tag' },
    { id: 8, name: 'tag' },
    { id: 9, name: 'tag' },
    { id: 10, name: 'tag' },
    { id: 11, name: 'tag' },
    { id: 12, name: 'tag' },
  ],
};
