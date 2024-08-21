import UnnnicBanner from '../components/Banner/Banner.vue';

export default {
  title: 'Data Display/Banner',
  component: UnnnicBanner,
  tags: ['autodocs'],
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

  render: (args) => ({
    components: {
      UnnnicBanner,
    },
    setup() {
      return { args };
    },
    methods: {
      emitRatingAction(star) {
        window.alert(`star: ${star}`);
      },
    },
    template: `
      <UnnnicBanner v-bind="args" @ratingAction="emitRatingAction" />
    `,
  }),
};

export const Info = {
  args: {
    type: 'info',
    firstTitle: 'Title 1',
    firstDescription: 'Description 1',
    secondTitle: 'Title 2',
    secondDescription: 'Description 2',
    thirdTitle: 'Title 3',
    thirdDescription: 'Description 3',
    subtitle: 'Subtitle',
    rating: 3,
  },
};
