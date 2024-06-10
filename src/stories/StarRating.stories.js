import UnnnicStarRating from '../components/StarRating/StarRating.vue';

export default {
  title: 'Rating/StarRating',
  component: UnnnicStarRating,
  argTypes: {
    showValue: { control: { type: 'boolean' } },
    readonly: { control: { type: 'boolean' } },
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: {
      UnnnicStarRating,
    },

    data() {
      return {
        value: 4,
      };
    },

    template: `
      <div>
        <pre>v-model: {{ value }}</pre>
        <unnnic-star-rating v-model="value" showValue readonly />
      </div>
    `,
  }),
  args: {
    value: 3.6,
    showValue: true,
    readonly: true,
  },
};

export const Default = {};
