import unnnicMoodRating from '../components/MoodRating/MoodRating.vue';

export default {
  title: 'Rating/MoodRating',
  component: unnnicMoodRating,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicMoodRating,
  },

  data() {
    return {
      mood: null,
    };
  },

  template: `
    <div>
      <!--<pre>v-model: {{ mood }}</pre>-->
      <unnnic-mood-rating v-bind="$props" v-model="mood">
      </unnnic-mood-rating>
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  title: 'Avalie seu aprendizado nesta aula',
};
