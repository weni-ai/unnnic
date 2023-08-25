import unnnicStarRating from '../components/StarRating/StarRating.vue';

export default {
  title: 'Rating/StarRating',
  component: unnnicStarRating,
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 5, step: 0.1 } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicStarRating,
  },

  template: `
    <div>
      <pre>v-model: {{ value }}</pre>
      <unnnic-star-rating v-bind="$props">
      </unnnic-star-rating>
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  value: 3.6,
  showValue: true,
  readonly: true,
};
