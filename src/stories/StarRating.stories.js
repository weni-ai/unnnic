import unnnicStarRating from '../components/StarRating/StarRating.vue';

export default {
  title: 'Rating/StarRating',
  component: unnnicStarRating,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicStarRating,
  },

  data() {
    return {
      rating: 3.6,
    };
  },

  template: `
    <div>
      <!--<pre>v-model: {{ rating }}</pre>-->
      <unnnic-star-rating v-bind="$props" v-model="rating">
      </unnnic-star-rating>
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  showValue: true,
  readonly: true,
};
