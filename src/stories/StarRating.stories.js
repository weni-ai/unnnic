import unnnicStarRating from '../components/StarRating/StarRating.vue';

export default {
  title: 'Rating/StarRating',
  component: unnnicStarRating,
  argTypes: {
    showValue: { control: { type: 'boolean' } },
    readonly: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicStarRating,
  },

  data() {
    return {
      value: 4,
    };
  },

  template: `
    <div>
      <pre>v-model: {{ value }}</pre>
      <unnnic-star-rating v-model="value" showValue readonly>
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
