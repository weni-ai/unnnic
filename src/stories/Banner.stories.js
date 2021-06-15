import unnnicBanner from '../components/Banner/Banner.vue';

export default {
  title: 'example/Banner',
  component: unnnicBanner,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['info'],
      },
    },
    firstTitle: { control: { type: 'text' } },
    firstDescription: { control: { type: 'text' } },
    secondTitle: { control: { type: 'text' } },
    secondDescription: { control: { type: 'text' } },
    thirdTitle: { control: { type: 'text' } },
    thirdDescription: { control: { type: 'text' } },
    subtitle: { control: { type: 'text' } },
    rating: { control: { type: 'number' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicBanner },
  template: '<unnnicBanner v-bind="$props" @ratingAction="emitRatingAction" />',
  methods: {
    emitRatingAction(star) {
      window.alert(`star: ${star}`);
    },
  },
});

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  firstTitle: 'Title 1',
  firstDescription: 'Description 1',
  secondTitle: 'Title 2',
  secondDescription: 'Description 2',
  thirdTitle: 'Title 3',
  thirdDescription: 'Description 3',
  subtitle: 'Subtitle',
  rating: 3,
};
